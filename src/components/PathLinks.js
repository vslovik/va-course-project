import React, { Component } from 'react'

export default class PathLinks extends Component {
    render = () => (
        <h2 className="public ">
            <span className="author" itemProp="author">
                <a className="url fn" rel="author" href="/">Link 1</a>
            </span>
            <span className="path-divider">/</span>
            <strong itemProp="name">
                <a data-pjax="#js-repo-pjax-container" href="/">Link 2</a>
            </strong>
        </h2>
    )
}