import React, { Component } from 'react'
import ChemicalFilter from '../filter/chemical'
import LogLinearToggle from '../toggle/loglinear'
import DayHourToggle from '../toggle/dayhour'
import {connect} from "react-redux";
import {selectSensor} from "../../actions";

class TemporalViewControls extends Component {

    render = () => {
        return (
        <div className="reponav-controls container">
            <span className="controls">
                <a href="" className="button-sensor">SENSOR {this.props.sensor}</a>
                <a href="" className="button-question">?</a>
            </span>
            <LogLinearToggle/>
            <DayHourToggle/>
            <ChemicalFilter/>
        </div>
    )}
}

const mapStateToProps = state => {
    return {
        sensor: state.sensor
    };
};

export default connect(mapStateToProps)(TemporalViewControls);