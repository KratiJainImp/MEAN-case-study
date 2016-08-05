'use strict';
/**
 * Controller : dashboard controller
 */
angular.module("meanStackApp")
	.controller('dashboardCtrl', ['$scope','$q','$log','dataSrvc','dashboardSrvc', function($scope,$q,$log,dataSrvc,dashboardSrvc) {
	
		var dashboard = this;
		dashboard.treeLoader1 = false;
		dashboard.treeLoader2 = false;
		dashboard.margin = {left: 40, right : 30, top : 20, bottom : 35};
		
		dashboard.init = function(){
			dashboard.data1 = [];
			dashboard.data2 = [];

			dashboard.getData();
		};

        /*Data Calls */
        dashboard.getData = function(){
	
			dashboard.treeLoader1 = true;
			dashboard.treeLoader2 = true;
			
			dataSrvc.getData("barChartData").then(
				function(resp) {                
					dashboard.treeLoader1 = false;
					dashboard.data1 = resp.data;
				},
				function(error) {
					$log.error(error);
				}
            )
			
			dataSrvc.getData("pieChartData").then(
				function(resp) {                
					dashboard.treeLoader2 = false;
					dashboard.data2 = resp.data;
				},
				function(error) {
					$log.error(error);
				}
            )
        }
		
		dashboard.color = d3.scale.category10().range();
		
	}]);