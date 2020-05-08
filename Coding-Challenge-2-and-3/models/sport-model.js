const mongoose = require("mongoose");
const uuid = require("uuid");

/* Your code goes here */

const sportsSchema = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  num_players: {
    type: Number,
    required: true,
  },
};

const sportsCollection = mongoose.model("sports", sportsSchema);

const Sports = {
  deleteSport: function (id) {
    return sportsCollection
      .deleteOne({ id })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = { Sports };
