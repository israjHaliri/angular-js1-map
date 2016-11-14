app.controller('manageMapController', function($scope, $http, $location, $routeParams, $cookies) {

  var getCookieAuth = $cookies.get("mapinfo-auth-cookies");

   var id = $routeParams.id;
   $scope.active_path = null;
   $scope.category = "save";

   $scope.sort = function(keyname){
      $scope.sortKey = keyname;   //set the sortKey to the param passed
      $scope.reverse = !$scope.reverse; //if true make it false and vice versa
   }


   $scope.loadData= function () {
      $http({
         url: baseUrl+'/api/coordinate',
         dataType: 'json',
         method: 'GET',
         data: '',
         headers: {
          "Content-Type": "application/json",
          "Authorization" :"Basic " + getCookieAuth
       }

    }).success(function(response){
      console.log("load response =",response);
      $scope.listData = response.list_data;
   }, function myError(response) {
      console.log("load error response =",response);
   });
 };



 $scope.processData= function (param) {

   console.log("category=",param);

   if (param == "save") 
   {
      $scope.saveData();
   }
   else
   {
      $scope.updateData();
   }

};


$scope.saveData= function () {

    $http({
         url: baseUrl+'/api/coordinate',
         dataType: 'json',
         method: 'POST',
         data: {
            'name' : $scope.name,
            'longitude' : $scope.longitude,
            'latitude' : $scope.latitude,
            'description' : $scope.description
         },
         headers: {
          "Content-Type": "application/json",
          "Authorization" :"Basic " + getCookieAuth
       }

    }).success(function(response){
      console.log("save response =",response);
      $scope.clear();
      $scope.loadData();
   }, function myError(response) {
      console.log("save error response =",response);
   });
};

$scope.updateData= function () {

   $http({
         url: baseUrl+'/api/coordinate',
         dataType: 'json',
         method: 'PUT',
         data: {
            'id' : $scope.id,
            'name' : $scope.name,
            'longitude' : $scope.longitude,
            'latitude' : $scope.latitude,
            'description' : $scope.description
         },
         headers: {
          "Content-Type": "application/json",
          "Authorization" :"Basic " + getCookieAuth
       }

    }).success(function(response){
      console.log("update response =",response);
      $scope.clear();
      $scope.loadData();
   }, function myError(response) {
      console.log("update error response =",response);
   });

};

$scope.editData= function (param) {

   $http.get(baseUrl+'/api/coordinate/'+param,{
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',"Authorization" :"Basic " + getCookieAuth},
   }).success(function(response) {
      console.log(response);
      $scope.id = response["id"];
      $scope.name = response["name"];
      $scope.longitude = response["longitude"];
      $scope.latitude = response["latitude"];
      $scope.description = response["description"];
      $scope.category = "edit";
   });

};

$scope.deleteData = function (param) {
   if(confirm("Are you sure to delete this data?")){
      $http.delete(baseUrl+"/api/coordinate/"+param,{
         headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',"Authorization" :"Basic " + getCookieAuth},
      }).success(function(response){
         $scope.loadData();
      });
   }
};

$scope.clear= function (param) {
   $scope.id = "";
   $scope.name = "";
   $scope.longitude = "";
   $scope.latitude = "";
   $scope.description = "";
   $scope.category = "save";
};

});