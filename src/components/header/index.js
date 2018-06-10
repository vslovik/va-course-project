import React, {Component} from 'react'
import Tabs from './../tabs'
import VectorialViewControls from "../vectorial-view-controls";
import TemporalViewControls from "../temporal-view-controls";

export default class Footer extends Component {
    render = () => (
        <div>
            <Tabs/>
            <VectorialViewControls/>
        </div>
    )
}