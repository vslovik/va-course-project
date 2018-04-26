import React, { Component } from 'react'
import {csvParseRows} from 'd3'
import { select, scaleLinear, min, max } from 'd3'
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

                const chem = {
                    1: [], 2: [], 3: [], 4: []
                };

                dataset = {};

                for(let i = 1; i <= 9; i++){
                    dataset[i] = chem;
                }

                // Chemical,Monitor,DateTime,Reading
                let che, mon, dt, val;
                for (let i = 1; i < rows.length; i++) {
                    che = chemicals[rows[i][0]];
                    mon = parseInt(rows[i][1]);
                    dt  = (new Date(rows[i][2])).getTime()/1000;
                    val = parseFloat(rows[i][3].replace(',', '.'));

                    dataset[mon][che].push({
                        dt: dt,
                        val: val
                    })
                }

                let dd = dataset[1][1];
                let start = dd[0].dt;

                let w = 400;
                let h = 300;

                let xScale = scaleLinear()
                    .domain([dd[0].dt, max(dd, function(d) { return d.dt; })])
                    .range([w, 0]);

                let yScale = scaleLinear()
                    .domain([min(dd, function(d) { return d.val; }), max(dd, function(d) { return d.val; })])
                    .range([h, 0]);

                let svg = select("td.plot1")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.selectAll("circle")
                    .data(dd)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d, i) {
                        return xScale(d.dt);
                    })
                    .attr("cy", function(d) {
                        return yScale(d.val);
                    })
                    .attr("r", 1);

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