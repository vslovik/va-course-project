import React, { Component } from 'react'
import Plots from './../plots'
import References from './../references'

export default class MainBlock extends Component {
    render = () => (
        <div className="wiki-body gollum-markdown-content instapaper_body">
            <div className="markdown-body">
                <blockquote>
                    <p><a href="/">VAST 2017 inspired</a> ▸ <strong>Mini Challenge # 1</strong></p>
                </blockquote>
                <p>Virtual Analytics course task description</p>
                <h2>Title</h2>
                <Plots />
                <h2>References</h2>
                <References />
            </div>
        </div>
    )
}