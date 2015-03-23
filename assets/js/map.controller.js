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
    

    
    // get geoJSON file and process
    $scope.ucscBuildings = {};
    
    $http.get('data/ucsc.buildings.geojson').
    success(function(data, status, headers, config) {
      $scope.ucscBuildings = data;
        //console.log('got a data object' + data);
        
    }).
    error(function(data, status, headers, config) {
      // log error
        console.log('we gotta problem');
    });
    
    // add geoJSON to map
    leafletData.getMap().then(function(map) {
        L.geoJson($scope.ucscBuilings).coordsToLatLng($scope.ucscBuildings).addTo(map);
    });
        
                                                         
}]); // end controller
    

mapApp.controller('forecastController', ['$scope', function ($scope) {



}]);