'use strict';
/**
 * Controller : US zip code map directive
 */
angular.module("meanStackApp").directive("pieChart", [ function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
			data: '=',
			x : '@',
			y : '@',
			tooltips: '@',
			showlabel: '@',
			donut: '=',
			color : '&',
			showlegend: '@'
		},
		link: function(scope, element, attrs) {
			
			var width    = element[0].parentElement.offsetWidth;
			var height   = element[0].parentElement.offsetHeight;
		
			scope.$watch('data', function(data){
				if(data !== undefined){
					nv.addGraph(function() {
						var chart = nv.models.pieChart()
							  .x(scope.x == undefined ? function(d){ return d.x; } : function(d){return d[scope.x];})
							  .y(scope.y == undefined ? function(d){ return d.y; } : function(d){return d[scope.y];})
							  .showLabels(scope.showlabel == undefined ? true : scope.showlabel)   //Display pie labels
							  .labelThreshold(.05)  		 //Configure the minimum slice size for labels to show up
							  .labelType("percent") 		 //Configure what type of data to show in the label. Can be "key", "value" or "percent"
							  .donut(scope.donut == undefined ? true : scope.donut)         	 //Turn on Donut mode. Makes pie chart look tasty!
							  .donutRatio(0.35)   			 //Configure how big you want the donut hole size to be.
							  .showLegend(scope.showlegend == undefined ? false : scope.showlegend)
							  .color(attrs.color === undefined ? dataVizColor.getColor() : scope.color());
						
						d3.select(element[0]).select("svg").remove();
						
						d3.select(element[0])
						  .append('svg')
						  .attr("font-family", "din-regular, Helvetica Neue, Helvetica, Segoe UI, Arial, sans-serif")
						  .attr("xmlns", "http://www.w3.org/2000/svg")
						  .attr("xlink", "http://www.w3.org/1999/xlink")
						  .datum(data)
						  .call(chart);

						nv.utils.windowResize(chart.update);
						scope.chart = chart;
						return chart;
					});
				}
			});
		}
	}
}]);

