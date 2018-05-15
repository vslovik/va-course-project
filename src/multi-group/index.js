import {csvParseRows, radialLine, scaleLinear, select, timeParse, range, cloudshapes, scaleOrdinal, max} from "d3";

export default function multiGroup(response)
{
    // http://jsfiddle.net/uvLX4/1/
    var margin = { top: 50, right: 0, bottom: 100, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 430 - margin.top - margin.bottom;

    var data = [
        {row: 0, col: 0, value: [{x: 1, y: 19}, {x: 2, y: 20}]},
        {row: 0, col: 1, value: [{x: 1, y: 24}, {x: 2, y: 27}]},
        {row: 1, col: 1, value: [{x: 1, y: 31}, {x: 2, y: 26}]},
        {row: 1, col: 2, value: [{x: 1, y: 29}, {x: 2, y: 19}]},
    ]

// Bar chart Module
/////////////////////////////////

// Declare namespace
    d3.cloudshapes = {};

// Declare component: (this outer function acts as the closure):
    d3.cloudshapes.barChart = function module() {
        var margin = {top: 10, right: 10, bottom: 20, left: 20},
            width = 500,
            height = 500,
            gap = 0,
            ease = "bounce";
        var svg;


        // Define the 'inner' function: which, through the surreal nature of JavaScript scoping, can access
        // the above variables.
        function exports(_selection) {
            _selection.each(function(_data) {
                var chartW = 60,
                    chartH = 60;

                var test_data = _data.value;

                var x1 = d3.scale.ordinal()
                    .domain(test_data.map(function(d) { return d.x; }))
                    .rangeRoundBands([0, chartW], 0.1);

                var y1 = d3.scale.linear()
                    .domain([0, d3.max(test_data, function(d, i) { return d.y; })])
                    .range([chartH, 0]);

                // If no SVG exists, create one - and add key groups:
                if (!svg) {
                    svg = d3.select(this)
                        .append("svg")
                        .classed("chart", true);
                    var container = svg.append("g").classed("container-group", true);
                    container.append("g").classed("chart-group", true);
                    container.attr({transform: "translate(" + 100*_data.row + "," + 100*_data.col + ")"});
                    //console.log("I am in IF");
                }

                // Transition the width and height of the main SVG and the key 'g' group:
                svg.classed("chart", true).transition().attr({width: width, height: height});
                var container = svg.append("g").classed("container-group", true);
                container.append("g").classed("chart-group", true);
                container.attr({transform: "translate(" + 100*_data.row + "," + 100*_data.col + ")"});
                console.log("I enter here");

                // Define gap between bars:
                var gapSize = x1.rangeBand() / 100 * gap;

                // Define width of each bar:
                var barW = x1.rangeBand() - gapSize;

                // Select all bars and bind data:
                var bars = svg.selectAll(".chart-group")
                    .selectAll(".bar")
                    .data(test_data);

                console.log(test_data);


                bars.enter().append("rect")
                    .classed("bar", "true")
                    .attr({
                        width: barW,
                        x: function (d) {
                            console.log("i am here");
                            return x1(d.x) + gapSize / 2; },
                        y: function(d) { return y1(d.y); },
                        height: function(d) { return chartH - y1(d.y); }
                    });



                // ENTER, UPDATE and EXIT CODE:
                // D3 ENTER code for bars!
                //   bars.enter().append("rect")
                //     .classed("bar", true)
                //   .attr({x: chartW,
                //      width: barW,
                //     y: function(d, i) {
                //		console.log("I am drawing actaully with:", test_data);
                //		return y1(d.y); },
                //   height: function(d, i) {
                //		return chartH - y1(d.y); }
                // })

                //	console.log("Do I get this far in the second go?");
                // D3 UPDATE code for bars
                // bars.transition()
                //     .ease(ease)
                //    .attr({
                //       width: barW,
                //      x: function(d) {
                //		console.log("I am drawing in the second update code");
                //		 return x1(d.x) + gapSize / 2; },
                //          y: function(d, i) { return y1(d.y); },
                //        height: function(d, i) { return chartH - y1(d.y); }
                //   });

                // D3 EXIT code for bars
                // bars.exit().transition().style({opacity: 0}).remove();
            });
        }


        // GETTERS AND SETTERS:
        exports.width = function(_x) {
            if (!arguments.length) return width;
            width = parseInt(_x);
            return this;
        };
        exports.height = function(_x) {
            if (!arguments.length) return height;
            height = parseInt(_x);
            return this;
        };
        exports.gap = function(_x) {
            if (!arguments.length) return gap;
            gap = _x;
            return this;
        };
        exports.ease = function(_x) {
            if (!arguments.length) return ease;
            ease = _x;
            return this;
        };

        return exports;
    };


    var chart = d3.cloudshapes.barChart()
        .width(800).height(800);

    for(var i=0; i<data.length; i++)  {
        var temp_value = data[i];
        d3.select("#punchcard")
            .datum(temp_value)
            .call(chart);
    }


}