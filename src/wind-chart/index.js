import circularHeatChart from "./circular.js";
import {csvParseRows, select, timeParse} from 'd3'

export default function windChart(response) {

    let rows = csvParseRows(response.responseText).slice(1);

    // 0.1 6.8
    let i, max = 0, min = Number.POSITIVE_INFINITY, measure, aSegments = 36, aSegment, angleStep = 10.0, mSegment, mSegments = 7, mStep = 1.0;

    let ddd = {};
    [...Array(aSegments*mSegments).keys()].forEach(function(i) {
        ddd[i] = 0;
    });

    rows.forEach(function(row) {
        let dt, angle, value;
        [dt, angle, value] = row;
        measure = parseFloat(value.replace(',','.'));
        if(measure < min) {
            min = measure;
        }
        if(measure > max) {
            max = measure;
        }
    });

    // ToDo Remove magic constants
    let mMax = 0, parseDateTime, t;
    rows.forEach(function (row) {
        let dt, angle, value;
        [dt, angle, value] = row;
        if (dt !== '' && angle !== '' && value !== '') {

            if (dt.length === '2016/01/01'.length) {
                parseDateTime = timeParse("%Y/%m/%d");
            } else if (dt.length === "2016/04/01 08:00:00".length) {
                parseDateTime = timeParse("%Y/%m/%d %H:%M:%S");
            } else {
                throw 'Value: "' + dt + '" is not a date'
            }

            t = parseDateTime(dt);

            if (t.getMonth() === 11) { //&& t.getDate() === 2

                angle = parseFloat(angle.replace(',', '.'));
                measure = parseFloat(value.replace(',', '.'));

                aSegment = Math.floor(angle / angleStep);
                if (aSegment === 36) aSegment = 35;

                mSegment = Math.floor(measure / mStep);
                if (mSegment === 7) mSegment = 6;

                // Get i - segment index: i = <angle segment index> * <number of measure segments> + <measure segment index>
                i = mSegment * aSegments + aSegment;
                if (i === 252) i = 251;

                ddd[i] += 1;
                if (ddd[i] > mMax) {
                    mMax = ddd[i];
                }
            }
        }
    });

    for(let i = 0; i < 252; i++) ddd[i] = ddd[i] / mMax;

    let data = Object.values(ddd);

    /* Random data */
    // let data = [];
    // for(let i = 0; i < 252; i++) data[i] = Math.random();

    let radialLabels  =  [...Array(7).keys()];
    let segmentLabels = [...Array(36).keys()].map(function(x) { return x * 10 });

    let chart = circularHeatChart()
        .innerRadius(20)
        .range(["white", "steelblue"])
        .radialLabels(radialLabels)
        .segmentLabels(segmentLabels);

    select('td.plot1')
        .selectAll('svg')
        .data([data])
        .enter()
        .append('svg')
        .call(chart);

}