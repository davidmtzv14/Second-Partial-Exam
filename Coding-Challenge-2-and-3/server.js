const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const { Sports } = require("./models/sport-model");

const app = express();

/* Your code goes here */
app.delete("/sports/delete", jsonParser, (req, res) => {
  let bodyId = req.body.id;
  let queryId = req.query.sportId;

  if (!bodyId) {
    res.statusMessage = "Please send the id in the body of the request";
    return res.status(406).end();
  }

  if (!queryId) {
    res.statusMessage =
      "Please send the sportId in the query params of the request";
    return res.status(406).end();
  }

  if (bodyId != queryId) {
    res.statusMessage = "The id in the body do not match with the sportId";
    return res.status(409).end();
  }

  Sports.deleteSport(bodyId)
    .then((response) => {
      if (response.deletedCount) {
        return res.status(204).end();
      } else {
        res.statusMessage = "The sport id was not found";
        return res.status(404).end();
      }
    })
    .catch((err) => {
      res.statusMessage = err;
      return res.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log("This server is running on port 8080");
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});
