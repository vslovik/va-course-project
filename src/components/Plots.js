import React, { Component } from 'react'
import {csvParseRows, timeParse, timeFormat, axisBottom, axisLeft} from 'd3'
import { select, scaleLinear, scaleLog, scaleQuantile, scaleQuantize, scaleTime, scaleSqrt, min, max } from 'd3'
import {request} from 'd3-request';
import dataCsv from '../data/ch2/SensorData.csv';

let dataset;

export default class Plots extends Component {
    state = {
        data: []
    };

    componentDidMount(state) {

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

        request(dataCsv)
            .mimeType("text/csv")
            .get(function(response) {

                let rows = csvParseRows(response.responseText);

                dataset = {};

                let sensors = Array.from(Array(9).keys());

                // Chemical,Monitor,DateTime,Reading
                let che, sen, val, t, rt, mon;
                for (let i = 1; i < rows.length; i++) {

                    sen = parseInt(rows[i][1]);
                    che = chemicals[rows[i][0]];
                    val = parseFloat(rows[i][3].replace(',', '.'));

                    if(rows[i][2].length === '2016/01/01'.length){
                        let parseDate = timeParse("%Y/%m/%d");
                        t = parseDate(rows[i][2]);

                    } else if(rows[i][2].length === "2016/04/01 08:00:00".length) {
                        let parseDateTime = timeParse("%Y/%m/%d %H:%M:%S");
                        t = parseDateTime(rows[i][2]);
                    }

                    if(null === t) {
                        console.log('DateTime parse error' + rows[i][2])
                    }

                    mon = t.getMonth();

                    rt = rows[i][2];

                    if(dataset[sen]) {
                        if(dataset[sen][mon]) {
                            if(dataset[sen][mon][che]){
                                dataset[sen][mon][che].push({
                                    val: val,
                                    t: t,
                                    rt: rt,
                                    mon: mon
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

                console.log(dataset);

                let dd = dataset[1][3][1]; // 7, 11

                let w = 800;
                let h = 600;
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