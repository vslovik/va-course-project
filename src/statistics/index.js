import {max, min, scaleLinear, scaleLog, scaleSqrt, scaleTime, select,
    timeFormat, axisLeft, axisBottom, scaleBand} from "d3";
import {APRIL, AUGUST, DECEMBER} from './../constants'
import {ORANGE, RED, BLUE, GREEN} from './../constants'
import {APP, CHL, MET, AGO} from './../constants'
import {LOG, LINEAR} from './../constants'

export default class Statistics {
    constructor(selector, data){

        this.data    = data;
        this.padding = 0;
        this.w       = 240;
        this.h       = 200;
        this.padding = 0;

        let barWidth  = 50;

        const colorMap = {};

        colorMap[AGO] = ORANGE;
        colorMap[APP] = RED;
        colorMap[CHL] = BLUE;
        colorMap[MET] = GREEN;

        this.colorMap =  colorMap;

        //Width and height
        let w = 160;
        let h = 240;

        let margin     = 10;
        let barPadding = 4;

        //Create SVG element
        let svg = select(selector)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        let stats = [
            [1.37, 1.85, 1.78, 1.22],
            [1.14, 1.12, 1.13, 1.14],
            [1.20, 1.29, 1.26, 1.20],
            [1.21, 1.26, 1.14, 1.32]
        ];

        let g = svg.append("g");

        g.selectAll("rect")
            .data([0, 1, 2, 3])
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                let interval = i > 1 ? 5 : 0;
                return i*barPadding + interval + margin + i * ((w - 2*margin - 5  - 3*barPadding) / 4);
            })
            .attr("y", 20)
            .attr("width", (w - 2*margin - 5 - 3*barPadding) / 4)
            .attr("height", 196)
            .attr("fill", "white");

        stats.forEach(function(stat, i){

            let sel = svg.append("g");

            sel.selectAll("rect")
                .data(stat)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    let interval = i > 1 ? 5 : 0;
                    return i*barPadding + interval + margin + i * ((w - 2*margin - 5  - 3*barPadding) / stat.length);
                })
                .attr("y", function(d) {
                    return h - (175 - 50*i) - (d * 16);
                })
                .attr("width", (w - 2*margin - 5 - 3*barPadding) / stat.length)
                .attr("height", function(d) {
                    return d * 16;
                })
                .attr("fill", function(d) {
                    return colorMap[i + 1];
                });

            sel.selectAll("text")
                .data(stat)
                .enter()
                .append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    let interval = i > 1 ? 5 : 0;
                    return i*barPadding + interval + margin + i * ((w - 2*margin - 5  - 3*barPadding) / stat.length) + 5;
                })
                .attr("y", function(d) {
                    return h - (175 - 50*i) - (d * 16) - 2;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "8px")
                .attr("fill", "grey");
        });

        svg.append("text")
            .text('* Average Reading (ppm)')
            .attr("x", 10)
            .attr("y", 232)
            .attr("font-family", "sans-serif")
            .attr("font-size", "7px")
            .attr("fill", "grey");

        svg.append("text")
            .text('Weekday | Weekend')
            .attr("x", 8)
            .attr("y", 12)
            .attr("font-family", "sans-serif")
            .attr("font-size", "7px")
            .attr("fill", "grey");

        svg.append("text")
            .text('Day | Night')
            .attr("x", 98)
            .attr("y", 12)
            .attr("font-family", "sans-serif")
            .attr("font-size", "7px")
            .attr("fill", "grey");

        svg.append("line")
            .style("stroke", "#eee")
            .attr("x1", 0)
            .attr("y1", 20)
            .attr("x2", 240)
            .attr("y2", 20);

        svg.append("line")
            .style("stroke", "#eee")
            .attr("x1", 0)
            .attr("y1", 216)
            .attr("x2", 240)
            .attr("y2", 216);

    }
}