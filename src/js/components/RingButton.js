import React, { Component } from 'react';
import classNames from "classnames";

export default class RingButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    const { onclick } = this.props;

    const classnames = classNames({
      "ring-button": true
    });
    
    return (
      <div className={classnames} onClick={(onclick) ? () => onclick() : null}>
        <div className="ring-button-inner">
          {this.props.children}
        </div>
      </div>
    )
  }
}
