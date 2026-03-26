$(document).ready(function () {

    // When searchBtn is pressed, create variable 'search' and displays it in the console
   $('#searchBtn').on("click", function(){
        var search = $('#searchInput').val();
        console.log('Search Complete... ' + "you typed " + search);

    // Calls API    
       $.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`, function (data) {

           var meals = data.meals;

            if (!meals) { 
                $('#results').html("<p>No recipes found.</p>");
                return; // Displays message if nothing is found
    }
           $('#results').empty(); // Clears previous search

           meals.forEach(function (meal) {

            var ingredientsList = "<ul>";

            var instructions = meal.strInstructions || "No instructions available.";

            for (var i = 1; i <= 20; i++) {
                var ingredient = meal[`strIngredient${i}`];
                var measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim() !== "") {
                    ingredientsList += `<li>${ingredient} - ${measure}</li>`;

                }
            } ingredientsList += "</ul>";

            var card = `
                <div class="recipeCard">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="recipeBody">
                    
                        <h2><strong>${meal.strMeal}</strong></h2>      
                        <p><strong>Category: </strong> ${meal.strCategory || "N/A"}</p>
                        <p><strong>Area:</strong> ${meal.strArea || "N/A"}</p>

                        <h3>Ingredients: </h3>
                        ${ingredientsList}

                        <h3><strong>Instructions:</strong></h3>
                        <p class="instructions">${instructions}</p>

                    </div>
                </div>
            `;


    $('#results').append(card);
            }); // Loops through the meals
        })// Runs on success

            .fail(function () {
                console.log("Error contacting API");
            });// Runs on fail
    });
   
   
 
});