import React, { Component } from 'react'
import {connect} from "react-redux";
import {selectSensor} from "../../../actions";

class SensorControl extends Component {

    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.selectSensor(this.props.value);
    }

    render = () => {

        const name = this.props.value === this.props.sensor ? '< Sensor' + this.props.value + ' >' : 'Sensor ' + this.props.value;

        return (
            <th onClick={this.handleClick}>{name}</th>
        )}
}

const mapStateToProps = state => {
    return {
        sensor: state.sensor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectSensor: sensor => dispatch(selectSensor(sensor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SensorControl);