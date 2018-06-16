import {csvParseRows, timeParse} from 'd3'

export default class WindChartData {

    constructor(winds, month) {

        this.month = month;
        this.aSegments = 36;
        this.angleStep = 10.0;
        this.mStep     = 1.0;
        this.mSegments = 7;
        this.cells     = this.aSegments * this.mSegments;

        this.data = [];
        for(let i = 0; i < this.cells; i++) {
            this.data.push(0);
        }

        let me = this;

        winds.forEach(function (row) {
            me.collectDataItem(row, month)
        });

        this.normalize();
    }

    normalize() {
        let mMax = Math.max(...this.data);

        for (let i = 0; i < this.cells; i++) this.data[i] = this.data[i] / mMax;
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

        throw new Error('Value: "' + dt + '" is not a date')
    }

    getCellIndex(angle, value) {

        angle = parseFloat(angle.replace(',', '.'));
        let measure = parseFloat(value.replace(',', '.'));

        let aSegment = Math.ceil(angle / this.angleStep) - 1;
        let mSegment = Math.ceil(measure / this.mStep) - 1;

        // Get i - segment index: i = <angle segment index> * <number of measure segments> + <measure segment index>
        return Math.ceil(mSegment * this.aSegments + aSegment) - 1;
    }

    getData() {

        return this.data;
    }

    collectDataItem(row, month = null) {

        let [dt, angle, value] = row;
        if (dt !== '' && angle !== '' && value !== '') {



            if((WindChartData.parseMeasureDate(dt).getMonth() === month) || (month === null)) {

                let i = this.getCellIndex(angle, value);

                // Update data
                this.data[i] += 1;
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