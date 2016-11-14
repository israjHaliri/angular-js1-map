app.controller('loginController', function($scope,$http,$location,$cookies) {

	var getCookieAuth = $cookies.get("mapinfo-auth-cookies");
	console.log(getCookieAuth);

	if (typeof(getCookieAuth) != 'undefined') {
		$location.path("/dashboard");	
	}

	$scope.login = function(){

		$http({
			url: baseUrl+"/api/user_info",
			method: 'POST',
			data: $.param({username: $scope.username}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				"Authorization" :"Basic " + authenticateUser($scope.username,$scope.password)
			}

		}).success(function (response) {

			var cookie_auth = authenticateUser($scope.username,$scope.password);
			$cookies.put('mapinfo-auth-cookies', cookie_auth); 
			if (getCookieAuth != null || getCookieAuth != "") {
				$location.path("/dashboard");
			}

		}, function myError(response) {
			console.log("load error response =", response);
		});

	};
});