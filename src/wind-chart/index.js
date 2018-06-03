import circularHeatChart from "./circular.js";
import {csvParseRows, select, timeParse} from 'd3'

export default function windChart(response) {

    let rows = csvParseRows(response.responseText).slice(1);

    console.log(rows);

    // 0.1 6.8
    let i, max = 0, min = Number.POSITIVE_INFINITY, measure, segments = 36, aSegment, angleStep = 10.0, mSegment, mStep = 1.0;

    let ddd = {};
    [...Array(36*7).keys()].forEach(function(i) {
        ddd[i] = 0;
    });

    console.log(ddd)

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

    console.log('min', min, 'max', max)


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

            // if (t.getMonth() === 3 && t.getDate() === 2) {



                console.log(dt, angle, value);

                angle = parseFloat(angle.replace(',', '.'));
                measure = parseFloat(value.replace(',', '.'));


                aSegment = Math.floor(angle / angleStep);
                if (aSegment === 36) aSegment = 35;

                console.log('aSegment', aSegment);

                mSegment = Math.floor(measure / mStep);
                if (mSegment === 7) mSegment = 6;

                console.log('mSegment', mSegment);

                // Get i - segment index: i = <angle segment index> * <number of measure segments> + <measure segment index>
                i = mSegment * segments + aSegment;
                if (i === 252) i = 251;

                ddd[i] += 1;
                if (ddd[i] > mMax) {
                    mMax = ddd[i];
                }



            // }
        }
    });

    for(let i = 0; i < 252; i++) ddd[i] = ddd[i] / mMax;

    console.log(min, max, segments, ddd);
    let data = Object.values(ddd);

    /* Random data */
    // let data = [];
    // for(let i = 0; i < 252; i++) data[i] = Math.random();

    console.log(data);

    let chart = circularHeatChart()
        .innerRadius(20)
        .range(["white", "steelblue"])
        .radialLabels(["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8."])
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