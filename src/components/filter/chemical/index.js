import React, { Component } from 'react'
import ChemicalButton from '../../buttons/chemical'
import {AGO, APP, CHL, MET, AGOG, APPL, CHLO, METH, ALL} from './../../../constants'

export default class ChemicalFilter extends Component {
    render = () => (
        <span className="controls">
            <ChemicalButton className="agog-button" name={AGOG} value={AGO}/>
            <ChemicalButton className="appl-button" name={APPL} value={APP}/>
            <ChemicalButton className="chlo-button" name={CHLO} value={CHL}/>
            <ChemicalButton className="meth-button" name={METH} value={MET}/>
            <ChemicalButton className="all-button" name={ALL} value={null}/>
        </span>
    )
}