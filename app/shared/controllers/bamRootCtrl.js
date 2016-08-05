'use strict';

/**
 * Controller : BAM root controller
 */
angular.module("meanStackApp")
    .controller('bamRootCtrl',['$scope','loginSrvc', function($scope,loginSrvc) {
        
        var bamRoot = this;
		
        this.doLogout = function(){
			loginSrvc.logOut();
        };     
    }]);