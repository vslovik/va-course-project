import {max, min, scaleLinear, scaleLog, scaleSqrt, scaleTime, select,
    timeFormat, axisLeft, axisBottom} from "d3";
import {ORANGE, RED, BLUE, GREEN} from './../constants'
import {AGO, APP, CHL, MET} from './../constants'
import {LINEAR} from './../constants'

export default class ChartSenMon {
    constructor(selector, data, scale = LINEAR, domain){

        this.data    = data;
        this.scale   = scale;
        this.domain  = domain;
        this.w       = 240;
        this.h       = 200;
        this.padding = 0;

        const colorMap = {};

        colorMap[AGO] = ORANGE;
        colorMap[APP] = RED;
        colorMap[CHL] = BLUE;
        colorMap[MET] = GREEN;

        this.colorMap =  colorMap;

        this.svg = select(selector)
            .append("svg")
            .attr('class', 'sensor-month')
            .attr("width", this.w)
            .attr("height", this.h);

        this.createScales()
            .drawPoints();
            //.addAxes();
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

        this.yScale = (this.scale === LINEAR ? scaleLinear() : scaleLog())
            .domain(this.domain)
            .rangeRound([this.h - this.padding, this.padding])
            .nice();

        this.aScale = scaleSqrt()
            .domain(this.domain)
            .range([0.4, 5]);

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
            .attr("cx", function (d) {
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