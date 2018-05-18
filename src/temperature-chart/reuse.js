import {csvParseRows, radialLine, scaleLinear, select, timeParse, range, json} from "d3";

json('rainfall.json', function(rainfallData) {

/* Label data */
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
let years = [];
for(let i = 1980; i < 2011; i++)
    i % 10 === 0 ? years.push(i) : years.push('');

/* Create the chart */
let chart = circularHeatChart()
    .segmentHeight(5)
    .innerRadius(20)
    .numSegments(12)
    .domain([50, 200])
    .range(['white', 'blue'])
    .segmentLabels(months)
    .radialLabels(years);

select('#chart')
    .selectAll('svg')
    .data([rainfallData])
    .enter()
    .append('svg')
    .call(chart);

});