import React, { Component } from 'react'
import {AGO, APP, APRIL, AUGUST, CHL, DECEMBER, LINEAR, LOG, MET, TEMPORAL} from "../../constants";
import {connect} from "react-redux";
import ChartSenMon from "../../scatter-chart/chart-sen-mon";
import Data from "../../scatter-chart/data";
import Chart from "../../polar-chart/chart";
import WindDirectionCalendar from "../../polar-chart/direction";

class SensorDetails extends Component {

    constructor() {
        super();

        this.chemicals = {
            "AGOC-3A": AGO,
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET
        };
    }

    setWindCalendar() {
        let key, dt, t, angle, speed;
        let chart = this;

        this.calendar = {};
        this.props.winddata.forEach(function (row) {

            [t, angle, speed] = row;

            dt = WindDirectionCalendar.parseMeasureDate(t); // ToDo use the same method for date parsing
            if (null != dt) {

                key = [
                    dt.getFullYear(),
                    dt.getMonth(),
                    dt.getDate()
                ].join('-');

                if (!chart.calendar[key]) {
                    chart.calendar[key] = {};
                }

                chart.calendar[key][dt.getHours()] = {
                    angle: parseFloat(angle.replace(',', '.')),
                    speed: parseFloat(speed.replace(',', '.'))
                };
            }
        });
    }

    drawCircularCharts(mon) {
        this.setWindCalendar();

        let max = 0.0, _;
        this.props.data.forEach(function (row) {
            [_, _, _, val] = row;
            val = parseFloat(val.replace(',', '.'));
            if (max < val) {
                max = val;
            }
        });

        let che, sen, val, dt;
        let sd = [];
        for(let i = 0; i < this.props.data.length; i++) {
            [che, sen, dt, val] = this.props.data[i];
            // ToDo month filtering

            let t = WindDirectionCalendar.parseMeasureDate(dt);

            if(t === null) {
                continue;
            }

            let mon = t.getMonth();

            sen = parseInt(sen);

            if(sen === this.props.sensor) {

                che = this.chemicals[che];
                val = parseFloat(val.replace(',', '.'));

                let angle = WindDirectionCalendar.getWindDirection(dt, this.calendar);
                if (null === angle) {
                    continue;
                }

                sd.push([Math.PI * angle / 180, val / max, che, mon])
            }
        }

        new Chart('.plot-circular-mon-' + (mon + 1) , sd, this.props.chemical, this.props.month);
    }

    drawScatterCharts() {
        let me = this;

        const scale = this.props.linearly ? LINEAR : LOG;

        if(this.props.chemical === null) {
            const data = (new Data()).getData(this.props.data, 'SenMon');

            [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                new ChartSenMon('.plot-scatter-mon-' + (mon + 1), data[me.props.sensor][mon], scale);
            });

        } else {
            const data = (new Data()).getData(this.props.data, 'SenCheMon');

            [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                new ChartSenMon('.plot-scatter-mon-' + (mon + 1), data[me.props.sensor][me.props.chemical][mon], scale);
            });
        }
    }

    componentDidMount(state) {

        let chart = this;

        [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
            chart.drawCircularCharts(mon);
        });

        this.drawScatterCharts();
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

        return (
            <div>
                {/*<div>state: {text}</div>*/}
                <div className="markdown-body">
                    <table className="wrapper">
                        <tbody>
                        <tr>
                            <td>
                                <table className="sensors">
                                    <tr>
                                        <th>April</th>
                                    </tr>
                                    <tr>
                                        <td className={'plot-circular-mon-' + (APRIL + 1)}/>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table className="sensors">
                                    <tr>
                                        <th>August</th>
                                    </tr>
                                    <tr>
                                        <td className={'plot-circular-mon-' + (AUGUST + 1)}/>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table className="sensors">
                                    <tr>
                                        <th>Decembre</th>
                                    </tr>
                                    <tr>
                                        <td className={'plot-circular-mon-' + (DECEMBER + 1)}/>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table className="sensors">
                                    <tr>
                                        <th>April</th>
                                    </tr>
                                    <tr>
                                        <td className={'plot-scatter-mon-' + (APRIL + 1)}/>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table className="sensors">
                                    <tr>
                                        <th>August</th>
                                    </tr>
                                    <tr>
                                        <td className={'plot-scatter-mon-' + (AUGUST + 1)}/>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table className="sensors">
                                    <tr>
                                        <th>Decembre</th>
                                    </tr>
                                    <tr>
                                        <td className={'plot-scatter-mon-' + (DECEMBER + 1)}/>
                                    </tr>
                                </table>
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
        winddata:state.winddata
    };
};

export default connect(mapStateToProps)(SensorDetails);