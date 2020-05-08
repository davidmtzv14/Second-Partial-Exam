function getMeals(name) {
  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  settings = {
    method: "GET",
  };

  fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Something went wrong");
    })
    .then((responseJson) => {
      let meals = responseJson.meals;
      let main = document.querySelector(".js-search-results");

      if (meals) {
        main.innerHTML = "";
        
        for (i = 0; i < meals.length; i++) {
          main.innerHTML += `<div> Name: ${meals[i].strMeal}</div>
            <div> Area: ${meals[i].strArea}</div>
            <div> Preparation: ${meals[i].strInstructions}</div>
            <img src ="${meals[i].strMealThumb}" alt="${meals[i].strMeal}">`;
        }
      } else {
        main.innerHTML = "<div>Meal not found</div>";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function watchForm() {
  let getMealsBtn = document.querySelector(".get-meals");
  let input = document.querySelector(".js-query");

  getMealsBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let name = input.value;

    getMeals(name);
  });
}

function init() {
  watchForm();
}

init();
