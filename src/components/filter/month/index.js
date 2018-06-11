import React, { Component } from 'react'
import MonthButton from '../../buttons/month'

export default class MonthFilter extends Component {
    render = () => (
        <span className="controls">
            <MonthButton className="apr-button" name="APR"/>
            <MonthButton className="aug-button" name="AUG"/>
            <MonthButton className="dec-button" name="DEC"/>
            <MonthButton className="all-button" name="ALL"/>
        </span>
    )
}