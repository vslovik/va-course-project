import React, { Component } from 'react'
import {select} from 'd3';
import {request} from 'd3-request';
import sensorCsv from '../../data/ch2/SensorData.csv';
import meteoCsv from '../../data/ch2/MeteorologicalData.csv';
import polarChart from '../../polar-chart'
import scatterChart from '../../scatter-chart'
import multiChart from '../../multi-chart'
import multiGroup from '../../multi-group'
import windChart from '../../wind-chart'
import exampleChart from '../../example-chart'

import {VECTORIAL, TEMPORAL} from '../../constants'
import {AGOG, APPL, CHLO, METH, ALL} from '../../constants';
import {APR, AUG, DEC}  from '../../constants';

import {connect} from 'react-redux'
import store from "../../store/index";

class Plots extends Component {

    constructor() {
        super();

        this.state = {
            data: [], //?
            view: TEMPORAL,
            chemical: ALL,
            month: ALL,
            sensor: ALL,
            daily: true,
            linearly: true
        };
    }

    componentDidMount_(state) {

        request(meteoCsv)
            .mimeType("text/csv")
            .get(polarChart);
    }

    componentDidMount(state) {

        // for(let i = 0; i < 2; i++) {
        //
        //     let c = 'plot' + (i + 1)
        //
        //     select(".markdown-body")
        //         .append("td")
        //         .attr("class", c);
        // }

        request(sensorCsv)
            .mimeType("text/csv")
            .get(scatterChart);
    }

    componentDidMount_(state) {
        request(meteoCsv)
            .mimeType("text/csv")
            .get(multiChart);
    }

    componentDidMount_(state) {
        request(meteoCsv)
            .mimeType("text/csv")
            .get(multiGroup);
    }

    componentDidMount_(state) {
        request(meteoCsv)
            .mimeType("text/csv")
            .get(windChart);
    }

    componentDidMount_(state) {
        request(meteoCsv)
            .mimeType("text/csv")
            .get(exampleChart);
    }

    render = () => {
        let text = JSON.stringify(
            {
                view: this.props.view,
                chemical: this.props.chemical,
                month: this.props.month,
                daily: this.props.daily,
                linearly: this.props.linearly
            }, true, 2);
        return (
        <div>
            {/*<div>state: {text}</div>*/}
            <div className="markdown-body">
                <table className="wrapper">
                    <tr>
                        <td>
                            <table className="sensors">
                                <tr><th>April</th></tr>
                                <tr><td className="plot-apr"/></tr>
                            </table>
                        </td>
                        <td>
                            <table className="sensors">
                                <tr><th>August</th></tr>
                                <tr><td className="plot-aug"/></tr>
                            </table>
                        </td>
                        <td>
                            <table className="sensors">
                                <tr><th>Decembre</th></tr>
                                <tr><td className="plot-dec"/></tr>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tr><th/></tr>
                                <tr><td/></tr>
                            </table>
                        </td>
                        <td>
                            <table className="sensors">
                                <tr><th>Statistics</th></tr>
                                <tr><td className="plot-stat"/></tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <div className="wrapper">
                    <table className="sensors">
                        <tr>
                            <th>Sensor 1</th>
                            <th>Sensor 2</th>
                            <th>Sensor 3</th>
                            <th>Sensor 4</th>
                            <th>Sensor 5</th>
                            <th>Sensor 6</th>
                            <th>Sensor 7</th>
                            <th>Sensor 8</th>
                            <th>Sensor 9</th>
                        </tr>
                        <tr>
                            <td className="plot1"></td>
                            <td className="plot2"></td>
                            <td className="plot3"></td>
                            <td className="plot4"></td>
                            <td className="plot5"></td>
                            <td className="plot6"></td>
                            <td className="plot7"></td>
                            <td className="plot8"></td>
                            <td className="plot9"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )}
}

const mapStateToProps = state => {
    return {
        view: state.view,
        chemical: state.chemical,
        month: state.month,
        sensor: state.sensor,
        daily: state.daily,
        linearly: state.linearly
    };
};

export default connect(mapStateToProps)(Plots);