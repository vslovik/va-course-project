import React, { Component } from 'react'
import {selectChemical} from "../../../actions";
import {connect} from "react-redux";

class ChemicalButton extends Component {

    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.selectChemical(this.props.value);
    }

    render = () => {

        const text = this.props.value === this.props.chemical ? '< ' + this.props.name + ' >' : this.props.name;

        return (
            <a href="" className={this.props.className} onClick={this.handleClick}>{text}</a>
    )}
}

const mapStateToProps = state => {
    return {
        chemical: state.chemical
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectChemical: chemical => dispatch(selectChemical(chemical))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChemicalButton);