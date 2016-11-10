app.controller('loginController', function($scope,$http) {

   // $scope.credentials = {
   //    username: 'jono',
   //    password: '123'
   // };

   // $scope.submit= function () {
   //    authService.login(credentials).then(function (user) {
   //       alert(user);
   //    });
   //
   // };

   var getUrl = window.location;
   var baseUrl = getUrl .protocol + "//" + getUrl.host;


   $scope.submit= function () {

      $http.post(baseUrl+'/login', {
         'username' : $scope.username,
         'password' : $scope.password
      }).success(function (response){
         console.log("response login false =",response);
      }, function myError(response) {
         console.log("response login failed =",response);
      });
   };

});