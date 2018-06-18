import React, { Component } from 'react'
import {APRIL, AUGUST, DECEMBER, LINEAR, LOG} from "../../constants";
import {connect} from "react-redux";
import ChartSenMon from "../../scatter-chart/chart-sen-mon";
import Data from "../../scatter-chart/data";
import MultiChartData from "../../multi-group/data";
import WindChartData from "../../wind-chart/data";
import ComboChart from "../../wind-chart/combo-chart";
import {extent} from "d3";

class SensorDetails extends Component {

    componentDidMount() {

        let chart = this;

        [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
            chart.drawComboCharts(mon);
        });

        this.drawScatterCharts();
    }

    drawComboCharts(mon)
    {
        let wcd = new WindChartData(this.props.winddata, this.props.month);

        let wcddata = wcd.getData();

        let pdata = MultiChartData.getData(this.props.data, this.props.winddata);

        (new ComboChart('.plot-circular-mon-' + (mon + 1), wcddata))
            .setPointsData(pdata)
            .setChemical(this.props.chemical)
            .setMonth(mon)
            .setSensor(this.props.sensor)
            .addPoints()
            .drawSensorFactory();
    }

    getSensorDomain(sensorData) {

        let mn = Number.POSITIVE_INFINITY;
        let mx = 0.0;
        [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
            let [min, max] = extent(sensorData[mon], function(d){return d.val;});
            if(min < mn)
                mn = min;
            if(max > mx)
                mx = max;
        });

        return [mn, mx];
    }

    drawScatterCharts() {
        let me = this;

        const scale = this.props.linearly ? LINEAR : LOG;

        if(this.props.chemical === null) {
            const data = (new Data(this.props.data)).getData('SenMon');

            const sensorDomain = me.getSensorDomain(data[me.props.sensor]);
            [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                new ChartSenMon('.plot-scatter-mon-' + (mon + 1), data[me.props.sensor][mon], scale, sensorDomain);
            });

        } else {
            const data = (new Data(this.props.data)).getData('SenCheMon');
            const sensorDomain = me.getSensorDomain(data[me.props.sensor][me.props.chemical]);
            [APRIL, AUGUST, DECEMBER].forEach(function (mon) {
                new ChartSenMon('.plot-scatter-mon-' + (mon + 1), data[me.props.sensor][me.props.chemical][mon], scale);
            });
        }
    }

    render = () => {
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
                                        <td className={'plot-circular-mon-' + (APRIL + 1)}/>
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
                                        <td className={'plot-circular-mon-' + (AUGUST + 1)}/>
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
                                        <td className={'plot-circular-mon-' + (DECEMBER + 1)}/>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table className="sensors">
                                    <tbody>
                                    <tr>
                                        <th>April</th>
                                    </tr>
                                    <tr>
                                        <td className={'plot-scatter-mon-' + (APRIL + 1)}/>
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
                                        <td className={'plot-scatter-mon-' + (AUGUST + 1)}/>
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
                                        <td className={'plot-scatter-mon-' + (DECEMBER + 1)}/>
                                    </tr>
                                    </tbody>
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