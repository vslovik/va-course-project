import React, { Component } from 'react'
import ChemicalFilter from '../filter/chemical'
import MonthFilter from '../filter/month'

export default class TemporalViewControls extends Component {
    render = () => (
        <div className="reponav-controls container">

            {/*<h1> Sensor 4 </h1>*/}

            {/*<span className="counter">?</span>*/}

            {/*<span className="controls">*/}
            {/*<a href="" className="button">Linear</a>*/}
            {/*<a href="" className="button">Log</a>*/}
            {/*</span>*/}

            {/*<span className="controls">*/}
            {/*<a href="" className="button">Day</a>*/}
            {/*<a href="" className="button">Hour</a>*/}
            {/*</span>*/}

            {/*<MonthFilter/>*/}

            <span className="controls">
                <a href="" className="agog-button_">Sensor 4</a>
                <a href="" className="dot">?</a>
            </span>

            <span className="controls">
                <a href="" className="toggle-button">Linear</a>
                <a href="" className="appl-button">Log</a>
            </span>

            <span className="controls">
                <a href="" className="toggle-button">Day</a>
                <a href="" className="appl-button">Hour</a>
            </span>

            <ChemicalFilter/>

        </div>
    )
}