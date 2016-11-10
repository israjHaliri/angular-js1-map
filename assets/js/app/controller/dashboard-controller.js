/**
 * Created by Israj PC on 11/1/2016.
 */
app.controller('dashboardController', function($scope, $http, $location, $routeParams) {

    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host;

    $scope.initData = function(){
        $http({
            url: "http://localhost:8181/api/dashboard",
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                "Content-Type": "application/json"
            }

        }).success(function (response) {
            console.log("load response =", response);
            $scope.username = response.userName
        }, function myError(response) {
            console.log("load error response =", response);
        });

    };

    $scope.initData();
});