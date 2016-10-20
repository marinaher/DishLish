$(document).ready(function () {
    
    //Click Event
    $("#searchButton").click(function () {
        search();
    });

    // "ENTER" key press event
    $("input").keypress(function () {
        if (event.which == 13 || event.keyCode == 13) {
            search();
        }
    });

    var search = function () {
        var userInput = $('#searchField').val();
        var yumId = "86f441c9";
        var yumKey = "cccd1f0197909d57a96869bd16487c92"
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://api.yummly.com/v1/api/recipes?_app_id=" + yumId + "&_app_key=" + yumKey + "&q=" + userInput,
            success: function (data) {
                q: $('#searchField').val("");
                console.log(data);
            }
        });
    }

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
        var dataItems = data.results;
        var ingredientInfo = '';

        for (var i = 0; i < dataItems.length; i++) {
            var item = dataItems[i];
            var recipeInfo = {
                source: 0,
                recipeName: item.recipeName,
                imageUrlsBySize: item.imageUrlsBySize,
                course: item.course,
                totalTimeInSeconds: do_conversion(item.totalTimeInSeconds),
                rating: item.rating
            };

            dataItems[i] = recipeInfo;
            ingredientInfo += '<li class="listOfRecipeInfo col-sm-6 col-md-3 flex-item">';
            ingredientInfo += '<h4 class="recipeName">' + item.recipeName + '</h4>';
            ingredientInfo += '<img class="artWork" src=' + item.imageUrlsBySize + '/>';
            ingredientInfo += '<p class="course">' + item.course + '</p>';
            ingredientInfo += '<p class="time">' + item.totalTimeInSeconds + '</p>';
            ingredientInfo += '<p class="rating">' + item.rating + '</p>';
            ingredientInfo += '</li>';
        }
        return ingredientInfo;
    }

    var do_conversion = function () {
        $('#seconds').html('<div class="progress-bar progress-bar-info progress-bar-striped"><div class="bar" style="width: 100%;"></div></div>');

        $.ajax({
            type: 'POST',
            url: '//www.tools4noobs.com/',
            data:
            {
                action: 'ajax_seconds_hh_mm_ss',
                seconds: $('#seconds').val()
            },
            success: function (data) {
                $('#result').html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('#result').html("<div class=\"alert alert-error\"> Error " + xhr.status + ": " + thrownError + "</div>");
            }
        });
        return false;
    }

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