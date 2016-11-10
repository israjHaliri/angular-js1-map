app.controller('showMapController', ['$scope', '$http', function ($scope, $http) {

    // angular.element(document).ready(function () {
    // });

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
            url: "http://localhost:8181/api/coordinate",
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                "Content-Type": "application/json"
            }

        }).success(function (response) {
            console.log("load response =", response);

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

        console.log($scope.dataMarker);
    };

    $scope.initData();
}]);