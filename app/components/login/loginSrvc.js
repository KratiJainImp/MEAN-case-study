'use strict';
angular.module("meanStackApp").service('loginSrvc',['$http', '$rootScope', '$location', '$cookies', function($http, $rootScope, $location, $cookies){

	this.logOut = function(loginData,username,password){
		$cookies.remove("username");
		$cookies.remove("name");
		$rootScope.username = null;
		$rootScope.name = null;
		//delete $cookies.username;
		$location.path('/login');
	}
}]);