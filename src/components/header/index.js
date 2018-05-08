import React, { Component } from 'react'

import Menu from './../menu'
import PathLinks from './../path-links'
import Tabs from './../tabs'

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