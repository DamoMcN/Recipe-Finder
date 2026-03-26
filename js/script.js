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
            var card = `
                <div class="recipe-card">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
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