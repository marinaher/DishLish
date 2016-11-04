$(document).ready(function () {
    var self = this;
    $('form').submit(function (event) {
        event.preventDefault();
        searchFarmersRequest();
    });

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 10
        });
        var infoWindow = new google.maps.InfoWindow({
            map: map
        });
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }
    var mapOptions = {
        zoom: 13,
        center: {
            lat: 43.038902,
            lng: -87.906471
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: false
    };
    infowindow = new google.maps.InfoWindow({
        content: "holding..." //place holder 
    });
    //Fire up the Google maps and place inside the map-canvas div
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    function searchFarmersRequest() {
        var marketId = [];
        var allLatlng = [];
        var allMarkers = [];
        var marketName = [];
        var marker = [];
        $('#searchZip').submit(function () { // bind function to submit event of form
            var userZip = $("#textZip").val();
            var API = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + userZip;;
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: API,
                dataType: 'jsonp',
                success: function (data) {
                    $.each(data.results, function (i, val) {
                        marketId.push(val.id);
                        marketName.push(val.marketname);
                    });
                    var counter = 0;
                    //Use ID to get details
                    $.each(marketId, function (k, v) {
                        $.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + v,
                            dataType: 'jsonp',
                            success: function (data) {
                                doSomething(data);
                            }
                        });

                        function doSomething(data) {
                            for (var key in data) {
                                if (!data.hasOwnProperty(key) && data === undefined) {
                                    continue;
                                }
                                var results = data[key];
                                var GoogleLink = results.GoogleLink;
                                var latLong = decodeURIComponent(GoogleLink.substring(GoogleLink.indexOf("=") + 1, GoogleLink.lastIndexOf("(")));
                                var split = latLong.split(',');
                                var latitude = parseFloat(split[0]);
                                var longitude = parseFloat(split[1]);
                                var foundMarket = marketName[counter].substring(4);
                                myLatlng = new google.maps.LatLng(latitude, longitude);
                                allMarkers = new google.maps.Marker({

                                    position: myLatlng,
                                    map: map,
                                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                                    title: marketName[counter],
                                    html: '<div id="results" class="markerPop">' + '<h1>' + foundMarket + '</h1>' +
                                        '<h3>' + results.Address + '</h3>' + '<p>' + results.Products.split(';') + '</p>' +
                                        '<p>' + results.Schedule + '</p>' + '</div>'
                                });
                                allLatlng.push(myLatlng);
                                marker.push(allMarkers);
                                counter++;
                            };
                            google.maps.event.addListener(allMarkers, 'click', function () {
                                infowindow.setContent(this.html);
                                infowindow.open(map, this);
                            });
                            var bounds = new google.maps.LatLngBounds();
                            for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
                                bounds.extend(allLatlng[i]);
                            }
                            map.fitBounds(bounds);
                        }
                    });
                }
            });
            return false;
            //initMap();
        });
    }
});