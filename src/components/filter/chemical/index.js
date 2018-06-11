import React, { Component } from 'react'
import ChemicalButton from '../../buttons/chemical'

export default class ChemicalFilter extends Component {
    render = () => (
        <span className="controls">
            <ChemicalButton className="agog-button" name="AGOG"/>
            <ChemicalButton className="appl-button" name="APPL"/>
            <ChemicalButton className="chlo-button" name="CHLO"/>
            <ChemicalButton className="meth-button" name="METH"/>
            <ChemicalButton className="all-button" name="ALL"/>
        </span>
    )
}