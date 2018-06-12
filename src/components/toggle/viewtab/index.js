import React, { Component } from 'react'
import {selectView} from "../../../actions";
import {connect} from "react-redux";
import {ALL} from "../../../constants";

class ViewTab extends Component {

    constructor() {
        super();

        this.state = {
            view: ALL
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.selectView(this.props.value);
    }


    render = () => {

        let className = this.props.view === this.props.value ? "reponav-item selected" : "reponav-item";

        return (
             <a href="" className={className} onClick={this.handleClick}>{this.props.name}</a>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.view
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectView: view => dispatch(selectView(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTab);