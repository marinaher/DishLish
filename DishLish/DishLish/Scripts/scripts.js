$(document).ready(function () {
    
    //Click Event
    $("#searchButton").click(function () {
        search();
    });

    // "ENTER" key press event
    $("#searchButton").keypress(function () {
        if (event.which == 13 || event.keyCode == 13) {
            search();
        }
    });

    // Yummly API call
    var search = function () {
        var userInput = $('#searchField').val();
        console.log(userInput);
        var yumId = "86f441c9";
        var yumKey = "cccd1f0197909d57a96869bd16487c92"
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://api.yummly.com/v1/api/recipes?_app_id=" + yumId + "&_app_key=" + yumKey + "&q=" + userInput,
            success: function (data) {
                q: $('#searchField').val("");
                console.log(data);
                displayOnPage(data, userInput);
            }
        });
    }

    // Display on Page
    var displayOnPage = function (data, userInput) {
        var ingredientInfo = createIngredientList(data);
        var displayAmount = 10;

        $("#resultsLabel").fadeIn(200);
        $("#resultsCount").text("");
        $("#resultsCount").text(displayAmount + " results for \"" + userInput + "\".");
        $('#searchResultsList').empty();
        $('#searchResultsList').fadeIn(200);
        $('#searchResultsList').html(ingredientInfo);
    }

    var createIngredientList = function (data) {
        var dataItems = data.matches;
        var ingredientInfo = '';

        for (var i = 0; i < dataItems.length; i++) {
            var item = dataItems[i];
            var recipeInfo = {
                source: 0,
                recipeName: item.recipeName,
                imageUrlsBySize: item.imageUrlsBySize,
                totalTimeInSeconds: item.totalTimeInSeconds,
                rating: item.rating
            };

            console.log(recipeInfo.imageUrlsBySize[90]);

            dataItems[i] = recipeInfo;
            ingredientInfo += '<li class="listOfRecipeInfo col-sm-6 col-md-3 flex-item">';
            ingredientInfo += '<h4 class="recipeName">' + recipeInfo.recipeName + '</h4>';
            ingredientInfo += '<img class="artWork" src=' + recipeInfo.imageUrlsBySize[90] + '>';
            ingredientInfo += '<p class="time"> Cook time: (seconds)' + recipeInfo.totalTimeInSeconds + '</p>';
            ingredientInfo += '<p class="rating"> Rating: ' + recipeInfo.rating + '</p>';
            ingredientInfo += '</li>';
        }
        return ingredientInfo;
    }

    // Save Ingredients onClick Redirect to Index
    $('#saveIngredients').click(function () {
        //window.location.href="Index"
    });

    // Save Ingredients onClick Redirect to Index
    $('#whatCanIMake').click(function () {
        //window.location.href = "Index"
    });

    //// Save Ingredients to Db
    //$("#saveIngredients").click(function () {
    //    var selected = [];
    //    var ingredients = $("[type=checkbox]");
    //    var ingredientsLength = ingredients.length;
    //    var url = "GetIngredients";
    //    //console.log(ingredients);
    //    var ingredientsSelected = $(".form-group input:checked");
    //    $(ingredientsSelected).each(function () {
    //        var x = $(this).closest("div").attr('id');
    //        var y = $(this).attr('value');
    //        var z = {x, y }
    //        selected.push(z);
    //        console.log(z);
    //    });

        //console.log(JSON.stringify(selected));
        //$.post("IngredientsController/GetIngredients", JSON.stringify(selected));
        //$.ajax({
        //    type: "POST",
        //    url: url,
        //    data: JSON.stringify(selected),
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    //error: function (response) {
        //    //    alert("Error");
        //    })
        //});

    // Scroll Functions
    $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    $('.scrollToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });
});

// Save Ingredients to Db
function SaveIngredient() {
    var ingredientsArray = [];
    var ingredientNamesArray = [];
    var checkboxes = $('.ingredientTable tbody tr td .ing');
    for (var i = 0; i < checkboxes.length; i++){
        ingredientNamesArray.push(checkboxes[i].defaultValue);
    }
    var names = $('.ingredientTable tbody tr td .ing').val();
    var isChecked = checkboxes.map((x) => {
        return checkboxes[x].checked
    })
    for (var i = 0; i < checkboxes.length; i++) {
        if (isChecked[i]) {
            ingredientsArray.push(ingredientNamesArray[i]);
        }
    }
    $.ajax({
        type: "POST",
        url: "../Ingredients/SaveIngredients",
        dataType: "jsonp",
        contentType: "application/json",
        data: JSON.stringify(ingredientsArray)
    });
}

// Get Recipes based on Ingredients
function Ingredient(category, name, id) {
    this.category = category;
    this.name = name;
    this.id = id;
}
function GetReceipesBasedOnIngredients(ingredientsString) {

    var URL = "http://api.yummly.com/v1/api/recipes?_app_id=86f441c9&_app_key=cccd1f0197909d57a96869bd16487c92&requirePictures=true&q="

    URL = URL + ingredientsString;
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/jsonp",
        url: URL,
        success: function (data) {
            RenderRecipes(data);
        }
    });
}


function RenderRecipes(data) {
    //console.log(data);
    var dataItems = data.matches;

    $('#searchRecipesList').empty();
    $('#searchRecipesList').fadeIn(200);
    $('#searchRecipesList').html(DisplayRecipeInfo(dataItems));

        function DisplayRecipeInfo(dataItems) {
            var foundRecipe = '';

            for (var i = 0; i < dataItems.length; i++) {
                var item = dataItems[i];
                console.log(item);
                var foundRecipeInfo = {
                    source: 0,
                    recipeID: item.id,
                    recipeName: item.recipeName,
                    imageUrlsBySize: item.imageUrlsBySize,
                    totalTimeInSeconds: item.totalTimeInSeconds,
                    rating: item.rating
                };

                dataItems[i] = foundRecipeInfo;
                foundRecipe += '<span class=' + foundRecipeInfo.recipeID + '>';
                foundRecipe += '<li class="listOfRecipeInfo col-sm-6 col-md-3 flex-item">';
                foundRecipe += '<h4 class="recipeName">' + foundRecipeInfo.recipeName + '</h4>';
                foundRecipe += '<img class="artWork" src=' + foundRecipeInfo.imageUrlsBySize[90] + '>';
                foundRecipe += '<p class="time"> Cook time: ' + foundRecipeInfo.totalTimeInSeconds + ' (seconds)</p>';
                foundRecipe += '<p class="rating"> Rating: ' + foundRecipeInfo.rating + '</p>';
                foundRecipe += '</li>';
                foundRecipe += '</span>';
            }
            return foundRecipe;
        }
    $("#searchRecipesList span").click(function () {
        var myClass = $(this).attr("class");
        console.log(myClass);
        GetRecipeUrl(myClass);
    });

    function GetRecipeUrl(myClass) {
        var recipeUrl = "http://api.yummly.com/v1/api/recipe/" + myClass + "?_app_id=86f441c9&_app_key=cccd1f0197909d57a96869bd16487c92";
        //console.log(recipeUrl);
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/jsonp",
            url: recipeUrl,
            success: function (data) {
                //console.log(data.source.sourceRecipeUrl);
                FoundRecipeUrl(data);
            }
        });
    }
    function FoundRecipeUrl(data){
        var UrlRecipeData = data.source.sourceRecipeUrl;
        window.open(UrlRecipeData);
    }
}

// Save Recipe Url to Db
function SaveRecipeUrl() {
    var recipessArray = [];
    var recipeNamesArray = [];
    //var checkboxes = $('.ingredientTable tbody tr td .ing');
    for (var i = 0; i < checkboxes.length; i++) {
        recipeNamesArray.push(checkboxes[i].defaultValue);
    }
    var names = $('.ingredientTable tbody tr td .ing').val();
    var isChecked = checkboxes.map((x) => {
        return checkboxes[x].checked
    })
    for (var i = 0; i < checkboxes.length; i++) {
        if (isChecked[i]) {
            recipessArray.push(recipeNamesArray[i]);
        }
    }
    $.ajax({
        type: "POST",
        url: "../Ingredients/SaveIngredients",
        dataType: "jsonp",
        contentType: "application/json",
        data: JSON.stringify(recipessArray)
    });
}

// Put into view to Hide Header and Footer
//$(function () {
//    $("header, footer").hide();
//});
