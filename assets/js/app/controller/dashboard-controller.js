/**
 * Created by Israj PC on 11/1/2016.
 */
app.controller('dashboardController', function($scope, $http, $location, $routeParams, $cookies) {

    var getCookieAuth = $cookies.get("mapinfo-auth-cookies");

    console.log("get cookie auth = ",getCookieAuth);

    $scope.initData = function(){
        $http({
            url: baseUrl+"/api/dashboard",
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Basic " + getCookieAuth
            }

        }).success(function (response) {
            $scope.username = response.userName
        }, function myError(response) {
            console.log("load error response =", response);
        });

    };


    $scope.initData();
});