import React, { Component } from 'react'
import {APRIL, AUGUST, DECEMBER, LINEAR, LOG, TEMPORAL} from "../../constants";
import {connect} from "react-redux";
import ChartSenMon from "../../scatter-chart/chart-sen-mon";
import Data from "../../scatter-chart/data";
import {select} from "d3";
import ChartSen from "../../scatter-chart/chart-sen";

class SensorDetails extends Component {

    componentDidMount(state) {

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
                <div>state: {text}</div>
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