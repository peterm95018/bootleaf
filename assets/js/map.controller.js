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
mapApp.controller('homeController', ['$scope', function ($scope) {
    // show UCSC centered at zoom 13
    angular.extend($scope, {
                center: {
                    lat: 37.00010,
                    lng: -122.06001,
                    zoom: 13
                }
	});

}]);

mapApp.controller('forecastController', ['$scope', function ($scope) {



}]);