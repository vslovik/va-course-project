import React, { Component } from 'react'
import * as d3 from 'd3'

export default class Plots extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        d3.csv('../../data/ch2/SensorData.csv', (err, data) => {
            console.log(data);
            if (err) {
                console.log(data);
            }
        })
    }

    render = () => (
        <table>
            <tbody>
            <tr valign="top">
                <td width="25%">Plot</td>
                <td width="25%">Plot</td>
                <td width="25%">Plot</td>
                <td width="25%">Plot</td>
            </tr>
            </tbody>
        </table>
    )
}