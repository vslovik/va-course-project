import React, { Component } from 'react'
import {csvParseRows, timeParse, timeFormat, axisBottom, axisLeft, range, radialLine} from 'd3'
import { select, scaleLinear, scaleTime, scaleSqrt, min, max } from 'd3'
import {request} from 'd3-request';
import dataCsv from '../data/ch2/SensorData.csv';

export default class Plots extends Component {
    state = {
        data: []
    };

    componentDidMount(state) {
        let data = range(0, 2 * Math.PI, .01).map(function(t) {
            return [t, Math.sin(2 * t) * Math.cos(2 * t)];
        });

        let width = 800,
            height = 600,
            radius = Math.min(width, height) / 2 - 30;

        let r = scaleLinear()
            .domain([0, .5])
            .range([0, radius]);

        let line = radialLine()
            .radius(function(d) { return r(d[1]); })
            .angle(function(d) { return -d[0] + Math.PI / 2; });

        let svg = select("td.plot1")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        let gr = svg.append("g")
            .attr("class", "r axis")
            .selectAll("g")
            .data(r.ticks(5).slice(1))
            .enter().append("g");

        gr.append("circle")
            .attr("r", r);

        gr.append("text")
            .attr("y", function(d) { return -r(d) - 4; })
            .attr("transform", "rotate(15)")
            .style("text-anchor", "middle")
            .text(function(d) { return d; });

        let ga = svg.append("g")
            .attr("class", "a axis")
            .selectAll("g")
            .data(range(0, 360, 30))
            .enter().append("g")
            .attr("transform", function(d) { return "rotate(" + -d + ")"; });

        ga.append("line")
            .attr("x2", radius);

        ga.append("text")
            .attr("x", radius + 6)
            .attr("dy", ".35em")
            .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
            .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null; })
            .text(function(d) { return d + "°"; });

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    }

    componentDidMount_(state) {

        const APP = 1;
        const CHL = 2;
        const MET = 3;
        const AGO = 4;

        const chemicals = {
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET,
            "AGOC-3A": AGO
        };

        let getDataset = (rows, structure = 'SenMonChe') => {
            let dataset = {};

            let sensors = Array.from(Array(9).keys());

            // Chemical,Monitor,DateTime,Reading
            let che, sen, val, t, rt, mon;
            for (let i = 1; i < rows.length; i++) {

                sen = parseInt(rows[i][1]);
                che = chemicals[rows[i][0]];
                val = parseFloat(rows[i][3].replace(',', '.'));

                let parseDateTime;

                if(rows[i][2].length === '2016/01/01'.length){
                    parseDateTime = timeParse("%Y/%m/%d");
                } else if(rows[i][2].length === "2016/04/01 08:00:00".length) {
                    parseDateTime = timeParse("%Y/%m/%d %H:%M:%S");
                }

                t = parseDateTime(rows[i][2]);

                if(null === t) {
                    console.log('DateTime parse error' + rows[i][2])
                }

                mon = t.getMonth();

                if(structure === 'SenMon') {
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

            return dataset;
        };

        request(dataCsv)
            .mimeType("text/csv")
            .get(function(response) {

                let rows = csvParseRows(response.responseText);

                // let dataset = getDataset(rows, 'SenMonChe');
                // let dd = dataset[1][3][1]; // 7, 11

                let dataset = getDataset(rows, 'SenMon');
                let dd = dataset[1][3]; // 7, 11

                console.log(dataset);

                let w       = 800;
                let h       = 600;
                let padding = 40;

                let xScale = scaleTime()
                    .domain([min(dd, function(d) { return d.t; }), max(dd, function(d) { return d.t; })])
                    .range([padding, w - padding])
                    .nice();

                console.log(xScale.domain());

                let yScale = scaleLinear()
                    .domain([min(dd, function(d) { return d.val; }), max(dd, function(d) { return d.val; })])
                    .rangeRound([h - padding, padding])
                    .nice();

                console.log(yScale.domain());

                let aScale = scaleSqrt()
                    .domain([0, max(dd, function(d) { return d.val; })])
                    .range([0, 5]);

                let yAxis = axisLeft()
                    .scale(yScale)
                    .ticks(10);

                let formatTime = timeFormat("%e");

                let xAxis = axisBottom()
                    .scale(xScale)
                    .tickFormat(formatTime)
                    // .ticks(10)
                ;

                let svg = select("td.plot1")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.selectAll("circle")
                    .data(dd)
                    .enter()
                    .append("circle")
                    .attr("fill", function(d) {

                        let color;
                        let colorMap = {};
                        colorMap[APP] = 'red';
                        colorMap[CHL] = 'orange';
                        colorMap[MET] = 'blue';
                        colorMap[AGO] = 'green';

                        return colorMap[d.che];
                    })
                    .attr("cx", function(d, i) {
                        return xScale(d.t);
                    })
                    .attr("cy", function(d) {
                        return yScale(d.val);
                    })
                    .attr("r", function(d) {
                        return aScale(d.val);
                    });

                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (h - padding) + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(" + padding + ",0)")
                    .call(yAxis);
            });

    }

    render = () => (
        <table>
            <tbody>
            <tr valign="top">
                <td className="plot1" width="85%"/>
                <td width="5%">Plot</td>
                <td width="5%">Plot</td>
                <td width="5%">Plot</td>
            </tr>
            </tbody>
        </table>
    )
}