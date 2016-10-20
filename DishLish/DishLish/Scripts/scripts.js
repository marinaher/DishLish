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

        $("#resultsLabel").fadeIn(200);
        $("#resultsCount").text("");
        $("#resultsCount").text(data.resultCount + " results for \"" + userInput + "\".");
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

    // Save Ingredients to Db
    $("#saveIngredients").click(function () {
        var selected = [];
        var ingredients = $("[type=checkbox]");
        var ingredientsLength = ingredients.length;
        var url = "GetIngredients";
        //console.log(ingredients);
        var ingredientsSelected = $(".form-group input:checked");
        $(ingredientsSelected).each(function () {
            
            var x = $(this).closest("div").attr('id');
            var y = $(this).attr('value');
            var z = {x, y }
            selected.push(z);
            console.log(z);
        });

        //console.log(JSON.stringify(selected));
        //$.post("IngredientsController/GetIngredients", JSON.stringify(selected));
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(selected),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //error: function (response) {
            //    alert("Error");
            })
        });

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

    //$('#search').on('keyup', function () {
    //    var pattern = $(this).val();
    //    $('.searchable-container .items').hide();
    //    $('.searchable-container .items').filter(function () {
    //         return $(this).text().match(new RegExp(pattern, 'i'));
    //     }).show();
    //});