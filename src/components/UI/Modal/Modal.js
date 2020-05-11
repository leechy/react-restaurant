import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {

  render() {
    return(
      <div className={this.props.show ? 'modalContainer -show': 'modalContainer'}>
        <div className="modalContainer__close" onClick={this.props.hide}></div>
        <div className="modalContainer__content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal;