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

    render = () => {

        const controls = this.props.view === VECTORIAL
            ? <VectorialViewControls/>
            : <TemporalViewControls/>;

        return (
        <div>
            <Tabs/>
            {controls}
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
