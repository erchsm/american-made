import React, { Component } from 'react';
import classNames from "classnames";


export default class JumboRingButton extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		
		const { animate } = this.props;
		
		const classnames = classNames({
			"jumbo-ring-button": true,
			"jumbo-ring-button--animate": animate
		});
		
		return (
			<div className={classnames}>
				<div className="jumbo-ring-button__bg--outer">
					<div className="jumbo-ring-button__bg--middle">
						<div className="jumbo-ring-button__bg--inner"/>
					</div>
				</div>
				<div className="jumbo-ring-button__fg">
					<h4 className="jumbo-ring-button__text">Scroll</h4>
					<i className="am-icon am-icon-plane2"/>
				</div>
			</div>
		)
	}
}
