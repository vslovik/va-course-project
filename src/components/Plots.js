import React, { Component } from 'react'
import {request} from 'd3-request';
import sensorCsv from '../data/ch2/SensorData.csv';
import meteoCsv from '../data/ch2/MeteorologicalData.csv';
import polarChart from '../polar-chart'
import scatterChart from '../scatter-chart'

export default class Plots extends Component {
    state = {
        data: []
    };

    componentDidMount_(state) {
        request(meteoCsv)
            .mimeType("text/csv")
            .get(polarChart);
    }

    componentDidMount(state) {
        request(sensorCsv)
            .mimeType("text/csv")
            .get(scatterChart);
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