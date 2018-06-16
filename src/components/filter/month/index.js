import React, { Component } from 'react'
import MonthButton from '../../buttons/month'
import {APRIL, AUGUST, DECEMBER} from './../../../constants'

export default class MonthFilter extends Component {
    render = () => (
        <span className="controls">
            <MonthButton className="apr-button" name="APR" value={APRIL}/>
            <MonthButton className="aug-button" name="AUG" value={AUGUST}/>
            <MonthButton className="dec-button" name="DEC" value={DECEMBER}/>
            <MonthButton className="all-button" name="ALL" value={null}/>
        </span>
    )
}