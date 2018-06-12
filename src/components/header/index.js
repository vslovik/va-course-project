import React, {Component} from 'react'

import PropTypes from "prop-types";
import {connect} from 'react-redux'

import Tabs from './../tabs'
import VectorialViewControls from "../vectorial-view-controls";
import TemporalViewControls from "../temporal-view-controls";

import {VECTORIAL, TEMPORAL} from '../../constants'
import {AGOG, APPL, CHLO, METH, ALL} from '../../constants';
import {APR, AUG, DEC}  from '../../constants';


import store from "../../store/index";

class Header extends Component {

    constructor() {
        super();

        // this.state = {
        //     view: TEMPORAL,
        //     chemical: ALL,
        //     month: ALL,
        //     sensor: ALL,
        //     daily: true,
        //     linearly: true
        // };
    }

    render = () => {

        // let text = JSON.stringify(
        //     {
        //         view: this.props.view,
        //         chemical: this.props.chemical,
        //         month: this.props.month,
        //         daily: this.props.daily,
        //         linearly: this.props.linearly
        //     }, true, 2);

        return (
        <div>
            {/*<div>state: {text}</div>*/}
            <Tabs/>
            <TemporalViewControls/>
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

export default connect(mapStateToProps)(Header);
