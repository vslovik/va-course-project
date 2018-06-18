import {max, min, scaleLinear, scaleLog, scaleSqrt, scaleTime, select,
    timeFormat, axisLeft, axisBottom, extent} from "d3";
import {APRIL, AUGUST, DECEMBER} from './../constants'
import {ORANGE, RED, BLUE, GREEN} from './../constants'
import {APP, CHL, MET, AGO} from './../constants'
import {LINEAR} from './../constants'

export default class ChartSen {
    constructor(selector, data, scale = LINEAR, domain){

        this.data    = data;
        this.scale   = scale;
        this.domain  = domain;
        this.w       = 36;
        this.h       = 240;
        this.padding = 2;

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

        let xDomain;

        [APRIL, AUGUST, DECEMBER].forEach(function(mon){

            xDomain = extent(chart.data[mon], function(d) { return d.t });

            chart.xScales[mon] = scaleTime()
                .domain(xDomain)
                .range([chart.padding, chart.w - chart.padding])
                .nice();
        });

        this.yScale = (chart.scale === LINEAR ? scaleLinear() : scaleLog())
            .domain(chart.domain)
            .rangeRound([chart.h - chart.padding, chart.padding])
            .nice();

        this.aScale = scaleSqrt()
            .domain(chart.domain)
            .range([0.2, 2.5]);

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
                    return chart.yScale(d.val);
                })
                .attr("r", function (d) {
                    return chart.aScale(d.val);
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