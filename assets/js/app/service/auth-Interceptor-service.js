/**
 * Created by israjhaliri on 07/11/16.
 */
app.factory('authInterceptorService', ['$q','$location', function ($q, $location,$window, $rootScope){
    var responseError = function (rejection) {
        console.log("rejection = ",rejection);

        if (rejection.status === 403) {
            $location.path('/').replace();
            $window.location.href = '/test';
            $rootScope.is_logged_in == 0;
        }
        return $q.reject(rejection);
    };

    return {
        responseError: responseError
    };
}]);
