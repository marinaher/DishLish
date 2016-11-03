// Global variables
var yumID = '86f441c9';
var yumKey = 'cccd1f0197909d57a96869bd16487c92';
var baseSearchURL = 'http://api.yummly.com/v1/api/recipes?_app_id=' + yumID + '&_app_key=' + yumKey;
var coursesURL = 'http://api.yummly.com/v1/api/metadata/course?_app_id=' + yumID + '&_app_key=' + yumKey;
var cuisinesURL = 'http://api.yummly.com/v1/api/metadata/cuisine?_app_id=' + yumID + '&_app_key=' + yumKey;
var cuisineData = [];
var courseData = [];

$(document).ready(function () {
    queryCuisineList();
    queryCourseList();
});

// Get the cuisine list
function queryCuisineList() {
    $.getJSON(cuisinesURL + '?callback=?', null, function (data) {
        // Callback function set_metadata is called upon success
    });
};

// Fill out the cuisines drop-down
function populateCuisineList(data) {
    // Pull out just the cuisine names and sort them
    var cuisines = [];
    for (var i = 0; i < data.length; i++) {
        cuisines.push(data[i].description);
    }
    cuisines.sort();

    // Generate HTML for the names to be put in the drop-down
    html = '';
    for (var i = 0; i < cuisines.length; i++) {
        html += '<option>' + cuisines[i] + '</option>';
    }

    // Add an "empty" option
    html = '<option></option>' + html;

    // Add the HTML to the drop-down
    document.getElementById('cuisineList').innerHTML = html;
};

// Get the course list
function queryCourseList() {
    $.getJSON(coursesURL + '?callback=?', null, function (data) {
    });
};

// Populate the courses drop-down
function populateCourseList(data) {
    var courses = [];
    for (var i = 0; i < data.length; i++) {
        courses.push(data[i].description);
    }
    courses.sort();

    html = '';
    for (var i = 0; i < courses.length; i++) {
        html += '<option>' + courses[i] + '</option>';
    }

    html = '<option></option>' + html;
    document.getElementById('courseList').innerHTML = html;
};


// Callback function for the courses
function set_metadata(type, data) {
    if (type == 'cuisine') {
        cuisineData = data;
        populateCuisineList(data);
    } else {
        courseData = data;
        populateCourseList(data);
    }
};

// Returns the search value for a specified key/value
function getSearchValue(what, val) {
    var dataToSearch = [];

    // TODO: create a data structure to hold the different types and make this index based

    // Determine where to look for the search value
    if (what == 'Cuisine') {
        dataToSearch = cuisineData;
    } else {
        dataToSearch = courseData;
    }

    try {
        for (var i = 0; i < dataToSearch.length; i++) {
            if (dataToSearch[i].description == val) {
                return dataToSearch[i].searchValue;
            }
        }
    } catch (e) {
        alert("Error: " + e.description);
    }
};

// Search for recipes
function recipeSearch() {
    // The full search URL that will be built
    var searchURL = baseSearchURL;

    // Find which cuisine was selected and add it to the search URL
    var cuisineList = document.getElementById('cuisineList');
    var cuisine = cuisineList.options[cuisineList.selectedIndex].text;
    //Find the search value for the specified cuisine
    searchURL += '&allowedCuisine[]=' + encodeURIComponent(getSearchValue('Cuisine', cuisine));

    // Find which course was selected and add it to the search URL
    var courseList = document.getElementById('courseList');
    var course = courseList.options[courseList.selectedIndex].text;
    searchURL += '&allowedCourse[]=' + encodeURIComponent(getSearchValue('Course', course));

    // Get the search query parameters, URL-encode them, and add them to the search URL
    var query = document.getElementById('searchParams').value;
    query = encodeURIComponent(query);
    searchURL += '&q=' + query;

    // Get the number of results to return and add it to the search URL
    var numResults = 14;
    //var numResults = document.getElementById('numResults').value;
    //if (parseInt(numResults) == 'NaN') {
    //    numResults = 10;
    //}
    //searchURL += '&maxResult=' + numResults;

    $.ajax({
        url: searchURL + '&callback=?',
        dataType: 'json',
        success: populateSearchResults
    });
};

// Callback function for recipe searching. Populates the search results
function populateSearchResults(results) {
    console.log(results);
    var html = '';
    
    if (results.matches.length == 0) {
        html = '<h3>No recipes match your search.</h3>'
    } else {
        for (var i = 0; i < results.matches.length; i++) {

            html += '<br /><li class="listOfRecipeInfo col-sm-6 col-md-3 flex-item">';
            html += '<h4 class="recipeName">' + results.matches[i].recipeName + '</h4>';
            html += '<img class="artWork" src=' + results.matches[i].imageUrlsBySize[90] + '>';
            html += '<p class="time"> Cook time: (seconds)' + results.matches[i].totalTimeInSeconds + '</p>';
            html += '<p class="rating"> Rating: ' + results.matches[i].rating + '</p>';
            html += '</li>';



            //html += '<br /><div class=\'recipe\'><label>' + results.matches[i].recipeName + '</label>';
            //html += '<br /><img class="artWork" src=' + results.matches[i].imageUrlsBySize[90] + '>';
            //html += '<br /><label>Ingredients:</label>' + ' ';
            //for (var j = 0; j < results.matches[i].ingredients.length; j++) {
            //    html += results.matches[i].ingredients[j] + ', ';
            //}
            //html += '</div>';
        }
    }
    document.getElementById('searchResults').innerHTML = html;
};