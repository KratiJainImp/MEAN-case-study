/**
 * app.js
 * Description : This file contains all routing information
 */
angular.module('meanStackApp', ['ngRoute', 'ngCookies', 'ui.bootstrap','xeditable','ngResource'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/components/login/login.html',
                controller: 'loginCtrl',
                controllerAs: 'login',
            })
            .when('/dashboard', {
                templateUrl: 'app/components/dashboard/dashboard.html',
                controller: 'dashboardCtrl',
                controllerAs: 'dashboard',
            })
            .when('/projectDashboard', {
                templateUrl: 'app/components/projectDashboard/projectDashboard.html',
                controller: 'projectDashboardCtrl',
                controllerAs: 'projectDashboard'
            })
            .when('/statusDashboard', {
                templateUrl: 'app/components/statusDashboard/statusDashboard.html',
                controller: 'statusDashboardCtrl',
                controllerAs: 'statusDashboardCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
    })
    .run(function (editableOptions,$rootScope, $location, $log, $cookies) {
        editableOptions.theme = 'bs3';
        /*   $rootScope.$on('$routeChangeStart', function(event) {
         var currentURL = $location.path();
         var username = $cookies.get('username');
         var name = $cookies.get('name');
         if (currentURL != '/login') {
         if (!username) {
         $log.error('InValid user.');
         $location.path('/login');
         }else{
         $rootScope.username = username;
         $rootScope.name = name;
         }
         }else if (currentURL == '/login') {
         if (username) {
         $rootScope.username = username;
         $rootScope.name = name;
         $location.path('/dashboard');
         }
         }
         });*/
    });