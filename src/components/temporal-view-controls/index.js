import React, { Component } from 'react'
import ChemicalFilter from '../filter/chemical'
import MonthFilter from '../filter/month'

export default class TemporalViewControls extends Component {
    render = () => (
        <div className="reponav-controls container">
            <span className="controls">
                <a href="" className="button-sensor">SENSOR 4</a>
                <a href="" className="button-question">?</a>
            </span>
            <span className="controls">
                <a href="" className="toggle-button-left">Linear</a>
                <a href="" className="toggle-button-right">Log</a>
            </span>
            <span className="controls">
                <a href="" className="toggle-button-left">Day</a>
                <a href="" className="toggle-button-right">Hour</a>
            </span>

            <ChemicalFilter/>
        </div>
    )
}