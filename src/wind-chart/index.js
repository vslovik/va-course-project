import circularHeatChart from "./circular.js";
import {csvParseRows, select, timeParse} from 'd3'


function getMixMaxMeasure(rows)
{
    const
        mIndex = 2;

    let max = 0,
        min = Number.POSITIVE_INFINITY,
        measure;

    rows.forEach(function(row) {
        measure = parseFloat(row[mIndex].replace(',','.'));
        if(measure < min) {
            min = measure;
        }
        if(measure > max) {
            max = measure;
        }
    });

    return [min, max];
}

function parseMeasureDate(dt)
{
    let parser;
    if (dt.length === '2016/01/01'.length) {
        parser = timeParse("%Y/%m/%d");
        return parser(dt)
    }

    if (dt.length === "2016/04/01 08:00:00".length) {
       parser = timeParse("%Y/%m/%d %H:%M:%S");
       return parser(dt)
    }

    throw 'Value: "' + dt + '" is not a date'
}

function getCellIndex(angle, value)
{
    const
        aSegments = 36,
        angleStep = 10.0,
        mStep     = 1.0;

    angle = parseFloat(angle.replace(',', '.'));
    let measure = parseFloat(value.replace(',', '.'));

    let aSegment = Math.ceil(angle / angleStep) - 1;
    let mSegment = Math.ceil(measure / mStep) - 1;

    // Get i - segment index: i = <angle segment index> * <number of measure segments> + <measure segment index>
    return Math.ceil(mSegment * aSegments + aSegment) - 1;
}

export default function windChart(response) {

    let rows = csvParseRows(response.responseText).slice(1);

    let i;

    const
        aSegments = 36,
        angleStep = 10.0,
        mSegments = 7;

    const cells = aSegments * mSegments;

    const APRIL    = 3,
          AUGUST   = 7,
          DECEMBER = 11;

    let dataMap = {};
    [...Array(cells).keys()].forEach(function(i) {
        dataMap[i] = 0;
    });

    let mMax = 0, t;
    rows.forEach(function (row) {

        let [dt, angle, value] = row;
        if (dt !== '' && angle !== '' && value !== '') {

            t = parseMeasureDate(dt);

            if (t.getMonth() === DECEMBER) { //&& t.getDate() === 2

                i = getCellIndex(angle, value);

                dataMap[i] += 1;
                if (dataMap[i] > mMax) {
                    mMax = dataMap[i];
                }
            }
        }
    });

    for(let i = 0; i < cells; i++) dataMap[i] = dataMap[i] / mMax;

    let data = Object.values(dataMap); //ToDo getData method

    let radialLabels  =  [...Array(mSegments).keys()];
    let segmentLabels = [...Array(aSegments).keys()].map(function(x) { return x * angleStep });

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