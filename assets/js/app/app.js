var app = angular.module('myApp', ['ngRoute','ngCookies','leaflet-directive', 'angularUtils.directives.dirPagination']);

app.config(['$routeProvider', function ($routeProvider) {

	$routeProvider
	.when('/', {templateUrl: 'pages/login.html', controller: 'loginController'})
	.when('/dashboard', {templateUrl: 'pages/dashboard.html', controller: 'dashboardController'})
	.when('/show_map', {templateUrl: 'pages/show-map.html',controller: 'showMapController'})
	.when('/manage_map', {templateUrl: 'pages/manage-map.html',controller: 'manageMapController'})
	.otherwise({redirectTo: '/'});

}]).service('authInterceptor', function($log) {
    var service = this;

    service.response = function(response) {
    	console.log(response.status);
   
        if (response.status == 401){
            window.location = "/";
        }
        return response;
    };
})
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);


app.run(function($rootScope,$location,$cookies) {
	$rootScope.logout = function(){
		$cookies.remove("mapinfo-auth-cookies");
		location.reload();
	};

	var getCookieAuth = $cookies.get("mapinfo-auth-cookies");
	$rootScope.isLoggedIn = getCookieAuth;
})