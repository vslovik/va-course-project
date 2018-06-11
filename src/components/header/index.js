import React, {Component} from 'react'
import Tabs from './../tabs'
import VectorialViewControls from "../vectorial-view-controls";
import TemporalViewControls from "../temporal-view-controls";

import {VECTORIAL, TEMPORAL} from '../../constants'
import {AGOG, APPL, CHLO, METH, ALL} from '../../constants';
import {APR, AUG, DEC}  from '../../constants';

export default class Footer extends Component {

    state = {
        data: [], //?
        view: TEMPORAL,
        chemical: ALL,
        month: ALL,
        sensor: ALL
    };

    render = () => (
        <div>
            <Tabs/>
            <TemporalViewControls/>
        </div>
    )
}