import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Modal extends Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop">
                <div className="modal">
                    <a className="close" href="" onClick={this.props.onClose}>x</a>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;