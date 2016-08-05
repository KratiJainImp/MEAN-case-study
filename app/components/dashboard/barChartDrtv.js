'use strict';
/**
 * Controller : US zip code map directive
 */
angular.module("meanStackApp").directive("barChart", [ function() {
    return {
        restrict: 'E',
        replace: false,
        scope:{
			data: '=',
			x : '@',
			y : '@',
			tooltips: '@',
			showxaxis: '@',
			showyaxis: '@',
			margin : '=',
			color : '&'
        },
		link: function(scope, element, attrs) {
			
			var width    = element[0].parentElement.offsetWidth;
			var height   = element[0].parentElement.offsetHeight;
		
			scope.$watch('data', function(data){
				if(data!== undefined){				
					nv.addGraph(function() {
				  
					  var chart = nv.models.discreteBarChart()
						  .x(attrs.x == undefined ? function(d){ return d.x; } : function(d){return d[scope.x];})
						  .y(attrs.y == undefined ? function(d){ return d.y; } : function(d){return d[scope.y];})
						//.staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
						  .showValues(true)       
						  .tooltips(attrs.tooltips === undefined ? false : (scope.tooltips  === 'true'))
						  .showXAxis(attrs.showxaxis === undefined ? false : (scope.showxaxis  === 'true'))
						  .showYAxis(attrs.showyaxis === undefined ? false : (scope.showyaxis  === 'true'))
						  .color(attrs.color === undefined ? dataVizColor.getColor() : scope.color())
						//.margin(scope.margin);
						
						d3.select(element[0]).select("svg").remove();
						
						d3.select(element[0])
						  .append('svg')
						  .attr("font-family", "din-regular, Helvetica Neue, Helvetica, Segoe UI, Arial, sans-serif")
						  .attr("xmlns", "http://www.w3.org/2000/svg")
						  .attr("xlink", "http://www.w3.org/1999/xlink")
						  .datum(data)
						  .call(chart);

						nv.utils.windowResize(chart.update);
						return chart;
					});
				}
			});
		}
	}
}]);

