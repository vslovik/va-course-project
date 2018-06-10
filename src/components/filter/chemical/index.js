import React, { Component } from 'react'

export default class ChemicalFilter extends Component {
    render = () => (
        <span className="controls">
            <a href="" className="agog-button">AGOG</a>
            <a href="" className="appl-button">APPL</a>
            <a href="" className="chlo-button">CHLO</a>
            <a href="" className="meth-button">METH</a>

            <a href="" className="all-button">ALL</a>
        </span>
    )
}