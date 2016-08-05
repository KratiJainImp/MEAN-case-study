'use strict';
angular.module("meanStackApp").service('dashboardSrvc',function($http){

	this.transformDataToPie = function(data){
		var finalData = [];
		
		for(var prop in data){
			finalData.push({x:prop,y:data[prop]});
		}
		
		return finalData;
	}
});