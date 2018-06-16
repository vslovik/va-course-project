import React, { Component } from 'react'
import ChemicalFilter from '../filter/chemical'
import LogLinearToggle from '../toggle/loglinear'
import DayHourToggle from '../toggle/dayhour'
import {connect} from "react-redux";
import Modal from './../modal'
import SensorDetails from './../sensor-details'

class TemporalViewControls extends Component {

    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    toggleModal = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render = () => {
        return (
        <div className="reponav-controls container">
            <span className="controls">
                <a href="" className="button-sensor" onClick={this.toggleModal}>SENSOR {this.props.sensor}</a>
                <a href="" className="button-question" onClick={this.toggleModal}>?</a>
            </span>
            <LogLinearToggle/>
            {/*<DayHourToggle/>*/}
            <ChemicalFilter/>

            <Modal show={this.state.isOpen}
                   onClose={this.toggleModal}>
                   <SensorDetails/>
            </Modal>

        </div>
    )}
}

const mapStateToProps = state => {
    return {
        sensor: state.sensor
    };
};

export default connect(mapStateToProps)(TemporalViewControls);