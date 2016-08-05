'use strict';
/**
 * Controller : login controller
 */
angular.module("meanStackApp")
	.controller('loginCtrl', ['$scope', '$rootScope', '$location','$log', '$cookies', 'dataSrvc', 'loginSrvc', function($scope,$rootScope, $location, $log, $cookies, dataSrvc, loginSrvc) {
	
		var login = this;
		login.treeLoader = false;
		login.invalid=false;
		
		login.invalidUsernameMsg = "Username is required.";
		login.invalidPasswordMsg = "Password is required.";
		
		login.invalidFnameMsg = "First Name is required.";
		login.invalidSUsernameMsg = "Username is required.";
		login.invalidSPasswordMsg = "Password is required.";
		
		login.showLoginBox = true;
		login.showSignupBox = false;
		login.showForgotPassword= false;
		
        /*Data Call */
        login.doLogin = function(username,password){
			login.treeLoader = true;
			
			if(username && password){
				var dataToPost = {username:username,password:password};
			}else{
				var dataToPost = {username:login.username,password:login.password};
			}
			dataSrvc.postData("login",dataToPost).then(
				function(resp) {  
					var loginData = resp.data;								
					if(loginData.error){
						login.invalid=true;
						
					}else{
						$cookies.put('username', loginData.username);
						$cookies.put('name', loginData.firstName);
						
						$rootScope.username = loginData.username;
						$rootScope.name = loginData.firstName;
						
						$location.path("projectDashboard");
					}					
					login.treeLoader = false;
				},
				function(error) {
					$log.error(error);
				}
            )
        }
		
		login.toggleSigninBox = function(whatToShow){
			if(whatToShow == "signup"){
				login.showLoginBox = false;
				login.showSignupBox = true;
			}else{
				login.showLoginBox = true;
				login.showSignupBox = false;
			}
		}
		
		login.doRegistration = function(){
			login.treeLoader = true;
			dataSrvc.postData("signup",{firstName:login.signupFName, lastName:login.signupLName, username:login.signupUName, password:login.signupPassword}).then(
				function(respMsg) {
					var singupResultMsg = respMsg.data;								
					if(singupResultMsg.error){
						login.invalidSignup=true;
						
					}else{
						login.doLogin(login.signupUName,login.signupPassword);
					}					
					login.treeLoader = false;
				},
				function(error) {
					$log.error(error);
				}
            )
		}

		login.resetPassword = function(){

			dataSrvc.resetPassword("reset",{username : login.username}).then(
				function(response){
					console.log(response.data.resetMsg);
				},
				function(error){
					console.log(response.data.resetMsg);
				}
			)

		}
	}]);