import React, { Component } from 'react'
import * as d3 from 'd3'
import {request, csv} from 'd3-request';
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
                console.log(response);

                let rows = d3.csvParseRows(response.responseText);

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
                    dt  = new Date(rows[i][2]);
                    val = parseFloat(rows[i][3].replace(',', '.'));

                    dataset[mon][che].push({
                        dt: dt,
                        val: val
                    })
                }

                console.log(dataset);

            });

    }

    render = () => (
        <table>
            <tbody>
            <tr valign="top">
                <td className="plot1" width="85%">Plot</td>
                <td width="5%">Plot</td>
                <td width="5%">Plot</td>
                <td width="5%">Plot</td>
            </tr>
            </tbody>
        </table>
    )
}