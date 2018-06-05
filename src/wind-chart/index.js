import circularHeatChart from "./circular.js";
import {csvParseRows, select, timeParse} from 'd3'

class WindChartData {

    constructor() {
        this.aSegments = 36;
        this.angleStep = 10.0;
        this.mStep     = 1.0;
        this.mSegments = 7;
        this.cells     = this.aSegments * this.mSegments;
        this.mMax      = 0;

        this.init();
    }

    init() {
        let data = {};

        [...Array(this.cells).keys()].forEach(function (i) {
            data[i] = 0;
        });

        this.data = data;
    }

    getMixMaxMeasure(rows) {
        const
            mIndex = 2;

        let max = 0,
            min = Number.POSITIVE_INFINITY,
            measure;

        rows.forEach(function (row) {

            measure = parseFloat(row[mIndex].replace(',', '.'));

            if (measure < min) {
                min = measure;
            }
            if (measure > max) {
                max = measure;
            }
        });

        return [min, max];
    }

    static parseMeasureDate(dt) {
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

    getCellIndex(angle, value) {

        angle = parseFloat(angle.replace(',', '.'));
        let measure = parseFloat(value.replace(',', '.'));

        let aSegment = Math.ceil(angle / this.angleStep) - 1;
        let mSegment = Math.ceil(measure / this.mStep) - 1;

        // Get i - segment index: i = <angle segment index> * <number of measure segments> + <measure segment index>
        return Math.ceil(mSegment * this.aSegments + aSegment) - 1;
    }

    getData(response, month) {

        let chart = this;

        csvParseRows(response.responseText).slice(1).forEach(function (row) {
            chart.collectDataItem(row, month)
        });

        for (let i = 0; i < this.cells; i++) this.data[i] = this.data[i] / this.mMax;

        return Object.values(this.data);
    }

    collectDataItem(row, month) {

        let [dt, angle, value] = row;

        if (dt !== '' && angle !== '' && value !== ''
            && WindChartData.parseMeasureDate(dt).getMonth() === month) {

            let i = this.getCellIndex(angle, value);

            // Update data
            this.data[i] += 1;

            // Update mMax
            if (this.data[i] > this.mMax) {
                this.mMax = this.data[i];
            }
        }
    }

    getSegmentLabels() {
        let chart = this;
        return [...Array(this.aSegments).keys()]
            .map(function(x) { return x * chart.angleStep });
    }

    getRadialLabels(){
        return [...Array(this.mSegments).keys()];
    }

}

export default function windChart(response) {

    const APRIL    = 3,
          AUGUST   = 7,
          DECEMBER = 11;

    let wcd = (new WindChartData());

    let chart = new circularHeatChart([wcd.getData(response, DECEMBER)])
        .setInnerRadius(20)
        .setRange(["white", "steelblue"])
        .setRadialLabels(wcd.getRadialLabels())
        .setSegmentLabels(wcd.getSegmentLabels())
        .draw();
}