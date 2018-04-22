import React, { Component } from 'react'

export default class Tabs extends Component {
    render = () => (
        <div className="reponav container">
            <span>
                <a className="reponav-item">Navigation 1</a>
                <a className="reponav-item selected">Navigation 2</a>
            </span>
        </div>
    )
}