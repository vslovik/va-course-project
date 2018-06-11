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

export default class Plots extends Component {
    state = {
        data: [], //?
        view: TEMPORAL,
        chemical: ALL,
        month: ALL,
        sensor: ALL
    };

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

    render = () => (
        <div className="wiki-body gollum-markdown-content instapaper_body">
            <div className="markdown-body">
                <div className="plot1"/>
            </div>
        </div>
    )
}