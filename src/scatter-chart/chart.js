import {max, min, scaleLinear, scaleSqrt, scaleTime, select,
    timeFormat, axisLeft, axisBottom} from "d3";

import Data from "./data"

export default class Chart {
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