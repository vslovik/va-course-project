import React, { Component } from 'react'
import Plots from './../plots'

export default class Main extends Component {
    render = () => (
        <div className="wiki-body gollum-markdown-content instapaper_body">
            <div className="markdown-body">
                <Plots />
            </div>
        </div>
    )
}