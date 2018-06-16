import React, { Component } from 'react'
import {connect} from "react-redux";
import {selectMonth} from "../../../actions";
import {ALL} from "../../../constants";

class MonthButton extends Component {

    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.selectMonth(this.props.value);
    }

    render = () => {

        const text = this.props.value === this.props.month ? '< ' + this.props.name + ' >' : this.props.name;

        return (
            <a href="" className={this.props.className} onClick={this.handleClick}>{text}</a>
        )}
}

const mapStateToProps = state => {
    return {
        month: state.month
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectMonth: month => dispatch(selectMonth(month))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthButton);