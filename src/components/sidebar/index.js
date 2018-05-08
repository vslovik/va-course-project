import React, { Component } from 'react'

import Status from './../Status'
import Input from './../Input'

export default class Sidebar extends Component {
    render = () => (
        <div className="wiki-rightbar">
            <Status />
            <div className="gollum-markdown-content readability-sidebar box box-small">
                <div className="wiki-custom-sidebar  markdown-body">
                    <p><a href="/" rel="nofollow">Sidebar link</a></p>
                    <h1>Sidebar tittle</h1>
                    <ul>
                        <li><a className="internal present" href="/">Link 1</a></li>
                    </ul>
                    <h3>Sidebar subtitle</h3>
                    <ul>
                        <li><a className="internal present" href="/">Link 1</a></li>
                        <li><a className="internal present" href="/">Link 2</a></li>
                    </ul>
                    <h3>
                        <a id="user-content-api-reference" className="anchor"
                           href="/" aria-hidden="true">
                        </a><a href="/">Sidebar subtitle</a>
                    </h3>
                </div>
            </div>
            <h5 className="mt-0 mb-2">Form control title</h5>
            <Input />
        </div>
    )
}