/**
 * Created by israjhaliri on 07/11/16.
 */
app.factory('authService', ['$http', '$q', function ($http, $q) {

    authService.login = function (credentials) {
        // return $http.post('/login', credentials)
        //     .then(function (res) {
        //         console.log("response login = ",res);
        //     });

        return credentials;
    };

}]);
