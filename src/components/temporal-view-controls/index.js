import React, { Component } from 'react'
import ChemicalFilter from '../filter/chemical'
import LogLinearToggle from '../toggle/loglinear'
import DayHourToggle from '../toggle/dayhour'

export default class TemporalViewControls extends Component {
    render = () => {
        return (
        <div className="reponav-controls container">
            <span className="controls">
                <a href="" className="button-sensor">SENSOR 4</a>
                <a href="" className="button-question">?</a>
            </span>
            <LogLinearToggle/>
            <DayHourToggle/>
            <ChemicalFilter/>
        </div>
    )}
}