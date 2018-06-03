import circularHeatChart from "./circular.js";
import {csvParseRows, select} from 'd3'

export default function windChart(response) {

    let rows = csvParseRows(response.responseText);

    console.log(rows);

    // 0.1 3.5
    let i, max = 0, min = Number.POSITIVE_INFINITY, measure, segments, aSegment, angleStep = 10.0, mSegment, mStep = 0.5;

    let d = {};
    [...Array(36).keys()].forEach(function(i) {
        d[i] = 0;
    });

    console.log(d)

    rows.forEach(function(row) {
        console.log(row);
        let dt, angle, value;
        [dt, angle, value] = row;

        measure = parseFloat(value.replace(',','.'));

        console.log(dt, angle, value);
        if(measure < min) {
            min = measure;
        }

        if(measure > min) {
            max = measure;
        }

        // number of measure segments
        segments = (max - 0.) / mStep;
        aSegment = Math.floor(angle / angleStep);
        mSegment = Math.floor(measure / mStep);

        // Get i - segment index: i = <angle segment index> * <number of measure segments> + <measure segment index>
        i = aSegment * segments + mSegment
        d[i] += 1
    });

    console.log(min, max, segments, d);

    /* Random data */
    let data = [];
    for(let i = 0; i < 252; i++) data[i] = Math.random();

    let chart = circularHeatChart()
        .innerRadius(20)
        .range(["white", "steelblue"])
        .radialLabels([".5", "1.", "1.5", "2.", "2.5", "3.", "3.5"])
        .segmentLabels(["0", "10", "20", "30", "40", "50", "60", "70", "80", "90",
            "100", "110", "120", "130", "140", "150", "160", "170", "180",
            "190", "200", "210", "220", "230","240", "250", "260", "270",
        "280", "290", "300", "310", "320", "330", "340", "350", "360"]);

    select('td.plot1')
        .selectAll('svg')
        .data([data])
        .enter()
        .append('svg')
        .call(chart);

}