// MODULE
var mapApp = angular.module('mapApp', ['ngRoute', 'ngResource', 'leaflet-directive']);


// ROUTES
mapApp.config(function ($routeProvider) {

    $routeProvider

        .when('/index.html', {
            templateUrl: 'public/index.html',
            controller: 'homeController'
        })

        // .when('/forecast', {
        //     templateUrl: 'pages/forecast.html',
        //     controller: 'forecastController'
        // })

});



// CONTROLLERS
mapApp.controller('homeController', ['$scope', '$http', 'leafletData', function ($scope, $http, leafletData) {
    
    
    // show UCSC centered at zoom 13
    angular.extend($scope, {
                center: {
                    lat: 37.00010,
                    lng: -122.06001,
                    zoom: 16
                }
    }); // end extend
    
var geojson;
    geojson = L.geoJson(null);
    
// styling the polygons
var myStyle = {
    "color": "#ff7800",
    "weight": 1,
    "opacity": 0.65
};

// highlight building colors when mouse is over
// create a style for buildings fill and stroke
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#ff7800',
        dashArray: '',
        fillOpacity: 0.65
    });
    

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}
    
// mouseout resets the layer
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}


function onEachFeature(feature, layer) {
if (feature.properties) {
    layer.bindPopup(
    "<h4>" + feature.properties.name + "</h4><br />" +
    feature.properties['addr:housenumber'] + " " +
    feature.properties['addr:street'] + "<br />" +
    feature.properties['addr:city'] + ", CA" + "<br />" + 
    feature.properties['addr:postcode'] + "<br />");
}
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
       // click: zoomToFeature
    });
    
}

   
// add geoJSON to map
// change from popup to onEachFeature
leafletData.getMap().then(function(map) {
    var geojsonLayer = new L.GeoJSON.AJAX(["data/ucsc.buildings.geojson"], {
        onEachFeature: onEachFeature,
        style: myStyle
    }).addTo(map);
    geojson = geojsonLayer;
});
    
        
                                                         
}]); // end controller
    

mapApp.controller('forecastController', ['$scope', function ($scope) {



}]);