app.controller('showMapController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

    var getCookieAuth = $cookies.get("mapinfo-auth-cookies");

    $scope.centerMap = {
        lat: 40.095,
        lng: -3.823,
        zoom: 8
    };

    $scope.defaults = {
        scrollWheelZoom: false
    };

    $scope.dataMarker = [];

    $scope.initData = function(){
        $http({
            url: baseUrl+"/api/coordinate",
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                "Content-Type": "application/json",
                "Authorization" :"Basic " + getCookieAuth
            }

        }).success(function (response) {

            for (var i = 0; i < response.list_data.length; i++) {
                $scope.dataMarker.push({
                    lat: parseFloat(response.list_data[i].latitude),
                    lng: parseFloat(response.list_data[i].longitude),
                    message: response.list_data[i].description,
                    focus: false,
                    draggable: false
                });
            }
        }, function myError(response) {
            console.log("load error response =", response);
        });
    };

    $scope.initData();
}]);