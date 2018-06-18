import {max, min, scaleLinear, scaleLog, scaleSqrt, scaleTime, select} from "d3";
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
            .drawPoints()
            .addLevels();
    }

    createScales() {

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

    addLevels() {

        let chart = this;
        let y, val;
        [0, 1, 2].forEach(function (i) {

            y = (i + 1) * chart.h / 4.;
            val = chart.domain[1] - ((i + 1) * chart.domain[1] / 4.);

            chart.svg.append("line")
                .attr("x1", 0)
                .attr("y1", y)
                .attr("x2", chart.w)
                .attr("y2", y)
                .style("stroke", "#eee");

            chart.svg.append("text")
                .attr("x", 0.9*chart.w)
                .attr("y", y - 4)
                .style("font-size", "7px")
                .style('fill', '#aaa')
                .text(Math.round(100*val)/100);

        });
    }
}