var app = angular.module('myApp', ['ngRoute', 'leaflet-directive', 'angularUtils.directives.dirPagination']);

app.config(['$routeProvider','$httpProvider', function ($routeProvider,$httpProvider) {

    $routeProvider
    .when('/', {templateUrl: 'pages/login.html', controller: 'loginController'})
    .when('/dashboard', {templateUrl: 'pages/dashboard.html', controller: 'dashboardController'})
    .when('/show_map', {templateUrl: 'pages/show-map.html',controller: 'showMapController'})
    .when('/manage_map', {templateUrl: 'pages/manage-map.html',controller: 'manageMapController'})
    .otherwise({redirectTo: '/'});

    // $httpProvider.interceptors.push('authInterceptorService');


}]);