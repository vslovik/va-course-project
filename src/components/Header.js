import React, { Component } from 'react'

import Menu from './Menu'
import PathLinks from './PathLinks'
import Tabs from './Tabs'

export default class Footer extends Component {
    render = () => (
        <div className="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">
            <div className="repohead-details-container clearfix container">
                <Menu />
                <PathLinks />
            </div>
            <Tabs />
        </div>
    )
}