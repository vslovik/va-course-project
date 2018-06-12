import React, { Component } from 'react'
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

    componentDidMount(state) {
        request(meteoCsv)
            .mimeType("text/csv")
            .get(polarChart);
    }

    componentDidMount_(state) {
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
        <div className="wiki-body gollum-markdown-content instapaper_body">
            <div className="markdown-body">
                <div>state: {text}</div>
                <div className="plot1"/>
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