import React, { Component } from 'react'
import {toggleLogLinear} from "../../../actions";
import {connect} from "react-redux";

class LogLinearToggle extends Component {

    constructor() {
        super();

        this.state = {
            linearly: true
        };

        this.handleLinear = this.handleLinear.bind(this);
        this.handleLog    = this.handleLog.bind(this);
    }

    handleLinear(event) {
        event.preventDefault();
        this.props.toggleLogLinear(true);
    }

    handleLog(event) {
        event.preventDefault();
        this.props.toggleLogLinear(false);
    }

    static emptyClick(event) {
        event.preventDefault();
        return false;
    }

    render = () => {

        let links;
        if(this.props.linearly) {
            links = (
                <span className="controls">
                    <a href="" className="toggle-button-left-active" onClick={LogLinearToggle.emptyClick}>Linear</a>
                    <a href="" className="toggle-button-right" onClick={this.handleLog}>Log</a>
                </span>
            )
        } else {
            links = (
                <span className="controls">
                    <a href="" className="toggle-button-left" onClick={this.handleLinear}>Linear</a>
                    <a href="" className="toggle-button-right-active" onClick={LogLinearToggle.emptyClick}>Log</a>
                </span>
            )
        }

        return links
    }
}

const mapStateToProps = state => {
    return {
        linearly: state.linearly
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleLogLinear: linearly => dispatch(toggleLogLinear(linearly))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogLinearToggle);