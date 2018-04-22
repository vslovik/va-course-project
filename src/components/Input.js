import React, { Component } from 'react'

export default class Input extends Component {
    render = () => (
        <div className="width-full input-group">
            <input type="text"
                   className="form-control input-sm text-small text-gray input-monospace js-url-field"
                   aria-label="Form control"
                   value=" placeholder"
                   readOnly="readonly"
            />
            <span className="input-group-button">
                <clipboard-copy
                    htmlFor="wiki-clone-url"
                    aria-label="Form control"
                    className="btn btn-sm zeroclipboard-button tooltipped tooltipped-s"
                    copied-label="Copied!"
                    tabindex="0" role="button">
                </clipboard-copy>
            </span>
        </div>
    )
}