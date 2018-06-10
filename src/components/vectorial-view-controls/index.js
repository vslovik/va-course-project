import React, { Component } from 'react'
import MonthFilter from '../filter/month'
import ChemicalFilter from '../filter/chemical'

export default class VectorialViewControls extends Component {
    render = () => (
        <div className="reponav-controls container">
            <MonthFilter/>
            <ChemicalFilter/>
        </div>
    )
}