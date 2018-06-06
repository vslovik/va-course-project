import {csvParseRows,
    max, min, scaleLinear, scaleSqrt, scaleTime, select,
    timeFormat, timeParse, axisLeft, axisBottom} from "d3";

class Data {

    constructor()
    {
        const [APP, CHL, MET, AGO] = Data.getChemicalsEncoding();

        this.chemicals = {
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET,
            "AGOC-3A": AGO
        };
    }

    static getChemicalsEncoding() {
        return [1, 2, 3, 4];
    }

    static parseMeasureDate(dt) {
        let parser;

        if (dt.length === '2016/01/01'.length) {
            parser = timeParse("%Y/%m/%d");
            dt = parser(dt)
        }

        if (dt.length === "2016/04/01 08:00:00".length) {
            parser = timeParse("%Y/%m/%d %H:%M:%S");
            dt = parser(dt)
        }

        if (null === dt)
            console.log('Value: "' + dt + '" is not a date');

        return dt;
    }

    collectStructuredData(row, structure, dataset) {

        let [che, sen, dt, val] = row;

        che = this.chemicals[che];
        sen = parseInt(sen);
        val = parseFloat(val.replace(',', '.'));

        let t = Data.parseMeasureDate(dt);

        let mon = t.getMonth();

        if (structure === 'SenMon') {
            if (dataset[sen]) {
                if (dataset[sen][mon]) {
                    dataset[sen][mon].push({
                        val: val,
                        t: t,
                        che: che
                    })
                } else {
                    dataset[sen][mon] = [];
                }
            } else {
                dataset[sen] = {};
            }
        } else {
            if (dataset[sen]) {
                if (dataset[sen][mon]) {
                    if (dataset[sen][mon][che]) {
                        dataset[sen][mon][che].push({
                            val: val,
                            t: t,
                            che: che
                        })
                    } else {
                        dataset[sen][mon][che] = [];
                    }
                } else {
                    dataset[sen][mon] = {};
                }
            } else {
                dataset[sen] = {};
            }
        }
    }

    getData(rows, structure = 'SenMonChe') {

        let data = {};

        for (let i = 1; i < rows.length; i++) {
            this.collectStructuredData(rows[i], structure, data)
        }

        return data;
    };
}

class Chart {
    constructor(selector, data){

        this.data    = data;
        this.w       = 800;
        this.h       = 600;
        this.padding = 40;

        const [APP, CHL, MET, AGO] = Data.getChemicalsEncoding();

        const colorMap = {};

        colorMap[APP] = 'red';
        colorMap[CHL] = 'orange';
        colorMap[MET] = 'blue';
        colorMap[AGO] = 'green';

        this.colorMap =  colorMap;

        this.svg = select(selector)
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h);

        this.createScales()
            .drawPoints()
            .addAxes();
    }

    createScales() {
        let chart = this;

        this.xScale = scaleTime()
            .domain([
                min(this.data, function(d) { return d.t; }),
                max(this.data, function(d) { return d.t; })
            ])
            .range([this.padding, this.w - this.padding])
            .nice();

        this.yScale = scaleLinear()
            .domain([
                min(this.data, function(d) { return d.val; }),
                max(chart.data, function(d) { return d.val; })
            ])
            .rangeRound([this.h - this.padding, this.padding])
            .nice();

        this.aScale = scaleSqrt()
            .domain([0, max(this.data, function(d) { return d.val; })])
            .range([0, 5]);

        return this;
    }

    drawPoints() {
        let chart = this;

        this.svg.selectAll("circle")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("fill", function (d) {
                return chart.colorMap[d.che];
            })
            .attr("cx", function (d, i) {
                return chart.xScale(d.t);
            })
            .attr("cy", function (d) {
                return chart.yScale(d.val);
            })
            .attr("r", function (d) {
                return chart.aScale(d.val);
            });

        return this;
    }

    addAxes() {
        let yAxis = axisLeft()
            .scale(this.yScale)
            .ticks(10);

        let xAxis = axisBottom()
            .scale(this.xScale)
            .tickFormat(timeFormat("%e"));
        // .ticks(10)

        this.svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (this.h - this.padding) + ")")
            .call(xAxis);

        this.svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + this.padding + ",0)")
            .call(yAxis);

        return this;
    }
}

export default function scatterChart(response) {

    let rows = csvParseRows(response.responseText);

    // let dataset = getData(rows, 'SenMonChe');
    // let dd = dataset[1][3][1]; // 7, 11

    let dataset = (new Data()).getData(rows, 'SenMon');
    let data = dataset[1][3]; // 7, 11

    new Chart('td.plot1', data);
}