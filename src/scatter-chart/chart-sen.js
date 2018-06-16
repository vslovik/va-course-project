import {max, min, scaleLinear, scaleLog, scaleSqrt, scaleTime, select,
    timeFormat, axisLeft, axisBottom} from "d3";
import {APRIL, AUGUST, DECEMBER} from './../constants'
import {ORANGE, RED, BLUE, GREEN} from './../constants'
import {APP, CHL, MET, AGO} from './../constants'
import {LOG, LINEAR} from './../constants'

export default class ChartSen {
    constructor(selector, data, scale = LINEAR){

        this.data    = data;
        this.scale   = scale;
        this.w       = 36;
        this.h       = 240;
        this.padding = 0;

        const colorMap = {};

        colorMap[AGO] = ORANGE;
        colorMap[APP] = RED;
        colorMap[CHL] = BLUE;
        colorMap[MET] = GREEN;

        this.colorMap =  colorMap;

        this.svgs = {};

        let chart = this;

        [APRIL, AUGUST, DECEMBER].forEach(function(mon){
            chart.svgs[mon] = select(selector)
                .append("svg")
                .attr("class", "sensor")
                .attr("width", chart.w)
                .attr("height", chart.h);
        });

        this.createScales()
            .drawPoints();
            //.addAxes();
    }

    createScales() {
        let chart = this;

        this.xScales = {};
        this.yScales = {};
        this.aScales = {};

        [APRIL, AUGUST, DECEMBER].forEach(function(mon){
            chart.xScales[mon] = scaleTime()
                .domain([
                    min(chart.data[mon], function(d) { return d.t; }),
                    max(chart.data[mon], function(d) { return d.t; })
                ])
                .range([chart.padding, chart.w - chart.padding])
                .nice();

            chart.yScales[mon] = (chart.scale === LINEAR ? scaleLinear() : scaleLog())
                .domain([
                    min(chart.data[mon], function(d) { return d.val; }),
                    max(chart.data[mon], function(d) { return d.val; })
                ])
                .rangeRound([chart.h - chart.padding, chart.padding])
                .nice();

            chart.aScales[mon] = scaleSqrt()
                .domain([0, max(chart.data[mon], function(d) { return d.val; })])
                .range([0, 2.5]);
        });

        return this;
    }

    drawPoints() {
        let chart = this;

        [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
            chart.svgs[mon].selectAll("circle")
                .data(chart.data[mon])
                .enter()
                .append("circle")
                .attr("fill", function (d) {
                    return chart.colorMap[d.che];
                })
                .attr("cx", function (d) {
                    return chart.xScales[mon](d.t);
                })
                .attr("cy", function (d) {
                    return chart.yScales[mon](d.val);
                })
                .attr("r", function (d) {
                    return chart.aScales[mon](d.val);
                });
        });

        return this;
    }

    addAxes() {

        let chart = this;

        [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
            let yAxis = axisLeft()
                .scale(chart.yScales[mon])
                .ticks(10);

            let xAxis = axisBottom()
                .scale(chart.xScales[mon])
                .tickFormat(timeFormat("%e"));
            // .ticks(10)

            chart.svgs[mon].append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + (chart.h - chart.padding) + ")")
                .call(xAxis);

            chart.svgs[mon].append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + chart.padding + ",0)")
                .call(yAxis);
        });

        return this;
    }
}