import React, { Component } from 'react'
import {ALL} from "../../../constants";
import {toggleDayHour} from "../../../actions";
import {connect} from "react-redux";

class DayHourToggle extends Component {

    constructor() {
        super();

        this.state = {
            daily: true
        };

        this.handleDay = this.handleDay.bind(this);
        this.handleHour = this.handleHour.bind(this);
    }

    handleDay(event) {
        event.preventDefault();
        this.props.toggleDayHour(true);
    }

    handleHour(event) {
        event.preventDefault();
        this.props.toggleDayHour(false);
    }

    emptyClick(event) {
        event.preventDefault();
        return false;
    }

    render = () => {

        let links;
        if(this.props.daily) {
            links = (
                <span className="controls">
                    <a href="" className="toggle-button-left-active" onClick={this.emptyClick}>Day</a>
                    <a href="" className="toggle-button-right" onClick={this.handleHour}>Hour</a>
                </span>
            )
        } else {
            links = (
                <span className="controls">
                    <a href="" className="toggle-button-left" onClick={this.handleDay}>Day</a>
                    <a href="" className="toggle-button-right-active" onClick={this.emptyClick}>Hour</a>
                </span>
            )
        }

        return links
    }
}

const mapStateToProps = state => {
    return {
        daily: state.daily
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleDayHour: daily => dispatch(toggleDayHour(daily))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayHourToggle);