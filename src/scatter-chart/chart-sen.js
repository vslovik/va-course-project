import {scaleLinear, scaleLog, scaleSqrt, scaleTime, select, extent} from "d3";
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
            .drawPoints()
            .addLevels();
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

    addLevels() {

        let chart = this;

        [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
            let y, val;
            [0, 1, 2].forEach(function(i){

                y = (i + 1) * chart.h / 4.;

                chart.svgs[mon].append("line")
                    .attr("x1",0)
                    .attr("y1", y)
                    .attr("x2", chart.w)
                    .attr("y2", y)
                    .style("stroke", "#eee");

                if(mon === DECEMBER) {
                    val = chart.domain[1] - ((i + 1) * chart.domain[1] / 4.);
                    chart.svgs[mon].append("text")
                        .attr("x", 0.3 * chart.w)
                        .attr("y", y - 4)
                        .style("font-size", "7px")
                        .style('fill', '#aaa')
                        .text(Math.round(100 * val) / 100);
                }

            });

        });
    }

}