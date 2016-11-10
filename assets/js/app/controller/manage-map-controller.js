app.controller('manageMapController', function($scope, $http, $location, $routeParams) {

   var getUrl = window.location;
   var baseUrl = getUrl .protocol + "//" + getUrl.host;


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
            "Content-Type": "application/json"
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

      $http.post(baseUrl+'/api/coordinate', {
         'name' : $scope.name,
         'longitude' : $scope.longitude,
         'latitude' : $scope.latitude,
         'description' : $scope.description
      }).success(function (response){
         console.log("response save =",response);
         $scope.clear();
         $scope.loadData();
      }, function myError(response) {
         console.log("response save =",response);
      });
   };

   $scope.updateData= function () {

      $http.put(baseUrl+'/api/coordinate', {
         'id' : $scope.id,
         'name' : $scope.name,
         'longitude' : $scope.longitude,
         'latitude' : $scope.latitude,
         'description' : $scope.description
      }).success(function (response){
         console.log("response update =",response);
         $scope.clear();
         $scope.loadData();
      }, function myError(response) {
         console.log("response update =",response);
      });
   };

   $scope.editData= function (param) {

      $http.get(baseUrl+'/api/coordinate/'+param).success(function(response) {
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
         $http.delete(baseUrl+"/api/coordinate/"+param).success(function(response){
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