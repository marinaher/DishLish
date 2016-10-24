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
            dataType: "json",
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
        dataType: "json",
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

    var URL = "http://api.yummly.com/v1/api/recipes?_app_id=86f441c9&_app_key=cccd1f0197909d57a96869bd16487c92&q="

    URL = URL + ingredientsString;
    //console.log(ingredientsString);
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: URL,
        success: function (data) {
            console.log(data);
        }
    });
}

//    $.ajax({
//        type: "GET",
//        dataType: "json",
//        contentType: "application/json",
//        url: "../Ingredients/GetRecipeByIngredient",
//        data: data,
//        success: function (data) {
//            gotStuffBack(data);
//        }
//    });

//    function gotStuffBack(data) {
//        console.log("===got some stuff back===");
//        console.log(data);
//    }
//}


//// All search results must include recipes with the specified ingredient(s)
//function GetRecipesAllowIng() {
//    var ingredients = [];
//    var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + yumId + "&_app_key=" + yumKey + "&q=" + onion+soup + "&allowedIngredient[]=" + garlic + "&allowedIngredient[]=" + cognac

//}

////  Exclude recipes with the specified ingredient(s). 
//function GetRecipesExcludeIng() {
//    var ingredients = [];
//    var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + yumId + "&_app_key=" + yumKey + "&q=" + onion + soup + "&excludedIngredient[]==" + garlic + "&excludedIngredient[]=" + cognac

//}

    //$(".main").onepage_scroll({
    //    sectionContainer: "section",
    //    easing: "ease",

    //    animationTime: 1000,
    //    pagination: true,
    //    updateURL: false,
    //    beforeMove: function (index) { },
    //    afterMove: function (index) { },
    //    loop: false,
    //    keyword: true,
    //    responsiveFallback: false,

    //    direction: "vertical"
    //});
