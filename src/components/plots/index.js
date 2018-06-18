import React, { Component } from 'react'
import {csvParseRows, select, selectAll} from 'd3';
import {request} from 'd3-request';

import sensorCsv from '../../data/SensorData.csv';
import meteoCsv from '../../data/MeteorologicalData.csv';
import {loadData, loadWindData, saveStats} from "../../actions";

import {VECTORIAL, TEMPORAL, DECEMBER, APRIL, AUGUST} from '../../constants'
import {LOG, LINEAR} from '../../constants';

import {connect} from 'react-redux'
import SensorControl from './../buttons/sensor'

import Data from "../../scatter-chart/data";
import ChartSenMon from "../../scatter-chart/chart-sen-mon";
import ChartSen from "../../scatter-chart/chart-sen";
import Statistics from "../../statistics";

import WindChartData from "../../wind-chart/data";
import MultiChartData from "../../multi-group/data";
import MultiChart from "../../multi-group/chart";
import CircularHeatChart from "../../wind-chart/circular";
import ComboChart from "../../wind-chart/combo-chart";

class Plots extends Component {

    static WindChartDraw(winddata, month) {
        new CircularHeatChart('.plot-wind', new WindChartData(winddata, month).getData());
    }

    static ComboChartDraw(data, winddata, chemical = null, month = null, sensor = 1) {

        // ToDo substitute with sensor plot legend
        (new ComboChart('.plot-sensor', new WindChartData(winddata, month).getData()))
            .setPointsData(MultiChartData.getData(data, winddata))
            .setChemical(chemical)
            .setMonth(month)
            .setSensor(sensor)
            .addPoints()
            .drawSensorFactory();
    }

    temporalViewDraw(rows) {

        let tr = select(".nine");

        for (let i = 0; i < 9; i++) {
            tr.append('td').attr('class', 'plot' + (i + 1));
        }

        let me = this;

        const obj = (new Data(rows));

        const stats = obj.getStats();

        this.props.saveStats(stats); //ToDo Do I need it?

        const scale = this.props.linearly ? LINEAR : LOG;

        if (this.props.chemical === null) {

            const data = obj.getData('SenMon');

            [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                new ChartSenMon('.plot-mon-' + (mon + 1), data[me.props.sensor][mon], scale);
            });

            for (let i = 0; i < 9; i++) {
                new ChartSen('.plot' + (i + 1), data[i + 1], scale);
            }
        } else {

            const data = obj.getData('SenCheMon');

            [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                new ChartSenMon('.plot-mon-' + (mon + 1), data[me.props.sensor][me.props.chemical][mon], scale);
            });

            for (let i = 0; i < 9; i++) {
                new ChartSen('.plot' + (i + 1), data[i + 1][this.props.chemical], scale);
            }

        }

        new Statistics('.plot-stat', stats)
    }

    temporalViewUpdate(prevProps) {
        if (this.props.chemical !== prevProps.chemical
            || this.props.sensor !== prevProps.sensor
            || this.props.linearly !== prevProps.linearly
        ) {

            if(this.props.chemical !== prevProps.chemical || this.props.linearly !== prevProps.linearly) {
                selectAll("svg.sensor").remove();
                selectAll("svg.sensor-month").remove();
            }

            if(this.props.sensor !== prevProps.sensor) {
                selectAll("svg.sensor-month").remove();
            }

            let me = this;

            const scale = this.props.linearly ? LINEAR : LOG;

            if (this.props.chemical === null) {

                const data = (new Data(this.props.data)).getData('SenMon');

                [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                    new ChartSenMon('.plot-mon-' + (mon + 1), data[me.props.sensor][mon], scale);
                });

                if (this.props.chemical !== prevProps.chemical || this.props.linearly !== prevProps.linearly) {

                    for (let i = 0; i < 9; i++) {
                        new ChartSen('.plot' + (i + 1), data[i + 1], scale);
                    }
                }

            } else {

                let data = (new Data(this.props.data)).getData('SenCheMon');

                [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                    new ChartSenMon('.plot-mon-' + (mon + 1), data[me.props.sensor][me.props.chemical][mon], scale);
                });


                if (this.props.chemical !== prevProps.chemical || this.props.linearly !== prevProps.linearly) {

                    for (let i = 0; i < 9; i++) {
                        new ChartSen('.plot' + (i + 1), data[i + 1][this.props.chemical], scale);
                    }
                }
            }
        }
    }

    vectorialViewDraw(rows, winds) {
        new MultiChart('.plot-map', rows, winds, this.props.chemical, this.props.month);
        Plots.WindChartDraw(winds, this.props.month);
        Plots.ComboChartDraw(rows, winds, this.props.chemical, this.props.month, this.props.sensor);
    }

    vectorialViewUpdate(prevProps) {
        if(this.props.chemical !== prevProps.chemical && this.props.view === VECTORIAL) {
            selectAll("svg.multi_chart").remove();
            new MultiChart('.plot-map', this.props.data, this.props.winddata, this.props.chemical, this.props.month);
        }

        if(this.props.month !== prevProps.month && this.props.view === VECTORIAL) {
            selectAll("svg.multi_chart").remove();
            new MultiChart('.plot-map', this.props.data, this.props.winddata, this.props.chemical, this.props.month);

            selectAll("svg.wind-chart").remove();
            Plots.WindChartDraw(this.props.winddata, this.props.month);
            Plots.ComboChartDraw(this.props.data, this.props.winddata, this.props.chemical, this.props.month, this.props.sensor);
        }
    }

    componentDidMount() {

        let me = this;
        // ToDo: loading control
        request(sensorCsv)
            .mimeType("text/csv")
            .get(function (response) {
                let rows = csvParseRows(response.responseText).slice(1);

                if (me.props.view === TEMPORAL) {
                    me.temporalViewDraw(rows)
                }

                me.props.loadData(rows);
                // ToDo rewrite with d3 v5 with promises
                request(meteoCsv)
                    .mimeType("text/csv")
                    .get(function (r) {
                        let winds = csvParseRows(r.responseText).slice(1);
                        me.props.loadWindData(winds);

                        if (me.props.view === VECTORIAL) {
                            me.vectorialViewDraw(rows, winds);
                        }
                    });
            });
    }

    componentDidUpdate(prevProps) {

        if(this.props.view !== prevProps.view && this.props.view === TEMPORAL) {
            this.temporalViewDraw(this.props.data)
        }

        if(this.props.view === prevProps.view && this.props.view === TEMPORAL) {
            this.temporalViewUpdate(prevProps)
        }

        if(this.props.view !== prevProps.view && this.props.view === VECTORIAL) {
            this.vectorialViewDraw(this.props.data, this.props.winddata);
        }

        if(this.props.view === prevProps.view && this.props.view === VECTORIAL) {
            this.vectorialViewUpdate(prevProps);
        }
    }

    render = () => {

        if (this.props.view === TEMPORAL) {

            let titles = [];
            for(let i = 0; i < 9; i++) {
                titles.push(<SensorControl key={i + 1} value={i + 1}/>)
            }

            return (
                <div>
                    <div className="markdown-body">
                        <table className="wrapper">
                            <tbody>
                            <tr>
                                <td>
                                    <table className="sensors">
                                        <tbody>
                                        <tr>
                                            <th>April</th>
                                        </tr>
                                        <tr>
                                            <td className={'plot-mon-' + (APRIL + 1)}/>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table className="sensors">
                                        <tbody>
                                        <tr>
                                            <th>August</th>
                                        </tr>
                                        <tr>
                                            <td className={'plot-mon-' + (AUGUST + 1)}/>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table className="sensors">
                                        <tbody>
                                        <tr>
                                            <th>Decembre</th>
                                        </tr>
                                        <tr>
                                            <td className={'plot-mon-' + (DECEMBER + 1)}/>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th/>
                                        </tr>
                                        <tr>
                                            <td/>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table className="sensors">
                                        <tbody>
                                        <tr>
                                            <th>Statistics</th>
                                        </tr>
                                        <tr>
                                            <td className="plot-stat"/>
                                        </tr>
                                        </tbody>
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
            )
        }

        return (
            <div>
                <div className="markdown-body">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="plot-map"/>
                                </td>
                                <td>
                                    <div className="plot-wind"/>
                                    <div className="plot-sensor"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.view,
        chemical: state.chemical,
        month: state.month,
        sensor: state.sensor,
        daily: state.daily,
        linearly: state.linearly,
        data: state.data,
        winddata:state.winddata,
        stats: state.stats
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadData: data     => dispatch(loadData(data)),
        loadWindData: data => dispatch(loadWindData(data)),
        saveStats: stats   => dispatch(saveStats(stats))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plots);