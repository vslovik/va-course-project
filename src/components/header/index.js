import React, {Component} from 'react'

import PropTypes from "prop-types";
import {connect} from 'react-redux'

import Tabs from './../tabs'
import VectorialViewControls from "../vectorial-view-controls";
import TemporalViewControls from "../temporal-view-controls";

import {VECTORIAL, TEMPORAL} from '../../constants'
import {AGOG, APPL, CHLO, METH, ALL} from '../../constants';
import {APR, AUG, DEC}  from '../../constants';

export default class Header extends Component {

    constructor() {
        super();

        this.state = {
            data: [], //?
            view: TEMPORAL,
            chemical: ALL,
            month: ALL,
            sensor: ALL
        };

        // this.nextStep = this.nextStep.bind(this);
    }

    render = () => (
        <div>
            <Tabs/>
            <TemporalViewControls/>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         profile: state.wizard.profile,
//         userGroupId: state.wizard.userGroupId,
//         step: state.wizard.step,
//         schoolType: state.schoolType.schoolType,
//         districtName: state.schoolProps.districtName
//     };
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         selectProfile: profile => dispatch(selectProfile(profile)),
//         nextStep: () => dispatch(nextStep()),
//         selectSchoolName: (schoolName) => dispatch(selectSchoolName(schoolName)),
//         selectDistrictName: (districtName) => dispatch(selectDistrictName(districtName))
//     };
// };

// const Wizard = connect(mapStateToProps, mapDispatchToProps)(ConnectedWizard);
//
// ConnectedWizard.propTypes = {
//     nextStep: PropTypes.func.isRequired
// };
//
// export default Wizard;
