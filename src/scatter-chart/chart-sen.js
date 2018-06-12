import {max, min, scaleLinear, scaleSqrt, scaleTime, select,
    timeFormat, axisLeft, axisBottom} from "d3";

import Data from "./data"

export default class ChartSen {
    constructor(selector, data){

        this.data    = data;
        this.w       = 36;
        this.h       = 240;
        this.padding = 0;

        const [APP, CHL, MET, AGO] = Data.getChemicalsEncoding();

        const colorMap = {};

        colorMap[APP] = 'red';
        colorMap[CHL] = 'orange';
        colorMap[MET] = 'blue';
        colorMap[AGO] = 'green';

        this.colorMap =  colorMap;

        this.svg3 = select(selector)
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h);


        this.svg7 = select(selector)
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h);

        this.svg11 = select(selector)
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h);

        this.createScales()
            .drawPoints();
            // .addAxes();
    }

    createScales() {
        let chart = this;

        this.xScale3 = scaleTime()
            .domain([
                min(this.data[3], function(d) { return d.t; }),
                max(this.data[3], function(d) { return d.t; })
            ])
            .range([this.padding, this.w - this.padding])
            .nice();

        this.yScale3 = scaleLinear()
            .domain([
                min(this.data[3], function(d) { return d.val; }),
                max(chart.data[3], function(d) { return d.val; })
            ])
            .rangeRound([this.h - this.padding, this.padding])
            .nice();

        this.aScale3 = scaleSqrt()
            .domain([0, max(this.data[3], function(d) { return d.val; })])
            .range([0, 5]);

        this.xScale7 = scaleTime()
            .domain([
                min(this.data[7], function(d) { return d.t; }),
                max(this.data[7], function(d) { return d.t; })
            ])
            .range([this.padding, this.w - this.padding])
            .nice();

        this.yScale7 = scaleLinear()
            .domain([
                min(this.data[7], function(d) { return d.val; }),
                max(chart.data[7], function(d) { return d.val; })
            ])
            .rangeRound([this.h - this.padding, this.padding])
            .nice();

        this.aScale7 = scaleSqrt()
            .domain([0, max(this.data[7], function(d) { return d.val; })])
            .range([0, 5]);


        this.xScale11 = scaleTime()
            .domain([
                min(this.data[11], function(d) { return d.t; }),
                max(this.data[11], function(d) { return d.t; })
            ])
            .range([this.padding, this.w - this.padding])
            .nice();

        this.yScale11 = scaleLinear()
            .domain([
                min(this.data[11], function(d) { return d.val; }),
                max(chart.data[11], function(d) { return d.val; })
            ])
            .rangeRound([this.h - this.padding, this.padding])
            .nice();

        this.aScale11 = scaleSqrt()
            .domain([0, max(this.data[11], function(d) { return d.val; })])
            .range([0, 5]);

        return this;
    }

    drawPoints() {
        let chart = this;

        this.svg3.selectAll("circle")
            .data(this.data[3])
            .enter()
            .append("circle")
            .attr("fill", function (d) {
                return chart.colorMap[d.che];
            })
            .attr("cx", function (d, i) {
                return chart.xScale3(d.t);
            })
            .attr("cy", function (d) {
                return chart.yScale3(d.val);
            })
            .attr("r", function (d) {
                return chart.aScale3(d.val);
            });

        this.svg7.selectAll("circle")
            .data(this.data[7])
            .enter()
            .append("circle")
            .attr("fill", function (d) {
                return chart.colorMap[d.che];
            })
            .attr("cx", function (d, i) {
                return chart.xScale7(d.t);
            })
            .attr("cy", function (d) {
                return chart.yScale7(d.val);
            })
            .attr("r", function (d) {
                return chart.aScale7(d.val);
            });

        this.svg11.selectAll("circle")
            .data(this.data[11])
            .enter()
            .append("circle")
            .attr("fill", function (d) {
                return chart.colorMap[d.che];
            })
            .attr("cx", function (d, i) {
                return chart.xScale11(d.t);
            })
            .attr("cy", function (d) {
                return chart.yScale11(d.val);
            })
            .attr("r", function (d) {
                return chart.aScale11(d.val);
            });

        return this;
    }

    addAxes() {
        let yAxis3 = axisLeft()
            .scale(this.yScale3)
            .ticks(10);

        let xAxis3 = axisBottom()
            .scale(this.xScale3)
            .tickFormat(timeFormat("%e"));
        // .ticks(10)

        this.svg3.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (this.h - this.padding) + ")")
            .call(xAxis3);

        this.svg3.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + this.padding + ",0)")
            .call(yAxis3);


        let yAxis7 = axisLeft()
            .scale(this.yScale3)
            .ticks(10);

        let xAxis7 = axisBottom()
            .scale(this.xScale3)
            .tickFormat(timeFormat("%e"));
        // .ticks(10)

        this.svg7.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (this.h - this.padding) + ")")
            .call(xAxis7);

        this.svg7.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + this.padding + ",0)")
            .call(yAxis7);


        let yAxis11 = axisLeft()
            .scale(this.yScale3)
            .ticks(10);

        let xAxis11 = axisBottom()
            .scale(this.xScale3)
            .tickFormat(timeFormat("%e"));
        // .ticks(10)

        this.svg11.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (this.h - this.padding) + ")")
            .call(xAxis11);

        this.svg11.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + this.padding + ",0)")
            .call(yAxis11);

        return this;
    }
}