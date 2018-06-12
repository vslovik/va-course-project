import React, { Component } from 'react'
import {csvParseRows, select, selectAll} from 'd3';
import {request} from 'd3-request';
import sensorCsv from '../../data/ch2/SensorData.csv';
import meteoCsv from '../../data/ch2/MeteorologicalData.csv';
import polarChart from '../../polar-chart'
import multiChart from '../../multi-chart'
import multiGroup from '../../multi-group'
import windChart from '../../wind-chart'
import exampleChart from '../../example-chart'

import {VECTORIAL, TEMPORAL, DECEMBER, APRIL, AUGUST} from '../../constants'
import {AGOG, APPL, CHLO, METH, ALL} from '../../constants';
import {APR, AUG, DEC} from '../../constants';
import {LOG, LINEAR} from '../../constants';

import {connect} from 'react-redux'
import SensorControl from './../buttons/sensor'
import Data from "../../scatter-chart/data";
import {loadData} from "../../actions";
import ChartSenMon from "../../scatter-chart/chart-sen-mon";
import ChartSen from "../../scatter-chart/chart-sen";

class Plots extends Component {

    constructor() {
        super();
    }

    componentDidMount_(state) {

        request(meteoCsv)
            .mimeType("text/csv")
            .get(polarChart);
    }

    temporalViewDraw(rows) {
        let me = this;

        const data = (new Data()).getData(rows, 'SenMon');
        const scale = this.props.linearly ? LINEAR : LOG;

        [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
            new ChartSenMon('.plot-mon-' + (mon + 1), data[me.props.sensor][mon], scale);
        });

        new ChartSenMon('.plot-stat', data[me.props.sensor][DECEMBER], scale);// ToDo

        for (let i = 0; i < 9; i++) {
            new ChartSen('.plot' + (i + 1), data[i + 1], scale);
        }
    }

    temporalViewUpdate(prevProps) {
        if (this.props.chemical !== prevProps.chemical
            || this.props.sensor !== prevProps.sensor
            || this.props.linearly !== prevProps.linearly
        ) {

            if(this.props.chemical !== prevProps.chemical || this.props.linearly !== prevProps.linearly)
                selectAll("svg").remove();

            if(this.props.sensor !== prevProps.sensor)
                selectAll("svg.sensor").remove();

            let me = this;

            const scale = this.props.linearly ? LINEAR : LOG;

            if (this.props.chemical === null) {

                const data = (new Data()).getData(this.props.data, 'SenMon');

                [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                    new ChartSenMon('.plot-mon-' + (mon + 1), data[me.props.sensor][mon], scale);
                });

                new ChartSenMon('.plot-stat', data[this.props.sensor][DECEMBER], scale);// ToDo

                if (this.props.chemical !== prevProps.chemical || this.props.linearly !== prevProps.linearly) {

                    for (let i = 0; i < 9; i++) {
                        new ChartSen('.plot' + (i + 1), data[i + 1], scale);
                    }
                }

            } else {

                let data = (new Data()).getData(this.props.data, 'SenCheMon');

                [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                    new ChartSenMon('.plot-mon-' + (mon + 1), data[me.props.sensor][me.props.chemical][mon], scale);
                });

                new ChartSenMon('.plot-stat', data[this.props.sensor][this.props.chemical][DECEMBER], scale);// ToDo

                if (this.props.chemical !== prevProps.chemical || this.props.linearly !== prevProps.linearly) {

                    for (let i = 0; i < 9; i++) {
                        new ChartSen('.plot' + (i + 1), data[i + 1][this.props.chemical], scale);
                    }
                }
            }
        }
    }

    componentDidMount(state) {

        let tr = select(".nine");

        for(let i = 0; i < 9; i++) {
            tr.append('td').attr('class', 'plot' + (i + 1));
        }

        let me = this;

        request(sensorCsv)
            .mimeType("text/csv")
            .get(function(response) {
                let rows = csvParseRows(response.responseText);

                me.props.loadData(rows);

                me.temporalViewDraw(rows)
            });
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        this.temporalViewUpdate(prevProps)
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
                linearly: this.props.linearly,
                sensor: this.props.sensor
            }, true, 2);

        let titles = [];
        for(let i = 0; i < 9; i++) {
            titles.push(<SensorControl value={i + 1}/>)
        }

        return (
        <div>
            {/*<div>state: {text}</div>*/}
            <div className="markdown-body">
                <table className="wrapper">
                    <tbody>
                    <tr>
                        <td>
                            <table className="sensors">
                                <tr><th>April</th></tr>
                                <tr><td className={'plot-mon-' + (APRIL + 1)}/></tr>
                            </table>
                        </td>
                        <td>
                            <table className="sensors">
                                <tr><th>August</th></tr>
                                <tr><td className={'plot-mon-' + (AUGUST + 1)}/></tr>
                            </table>
                        </td>
                        <td>
                            <table className="sensors">
                                <tr><th>Decembre</th></tr>
                                <tr><td className={'plot-mon-' + (DECEMBER + 1)}/></tr>
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
                    </tbody>
                </table>
                <div className="wrapper">
                    <table className="sensors">
                        <tbody>
                            <tr>{titles}</tr>
                            <tr className="nine"/>
                        </tbody>
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
        linearly: state.linearly,
        data: state.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadData: data => dispatch(loadData(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Plots);