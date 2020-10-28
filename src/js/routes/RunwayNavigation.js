import React, { Component, Fragment } from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';

// import { Motion, spring, presets } from 'react-motion'
import { Scroller, scrollInitalState } from 'react-skroll'


export class RunwayNav extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			hoverLeft: false,
			hoverRight: false,
      scroll: scrollInitalState
		}
	}
	
	leftHover = (bool) => {
		this.setState({
			hoverLeft: bool
		});
	}
	
	rightHover = (bool) => {
		this.setState({
			hoverRight: bool
		});
	}

	componentDidMount() {
		document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		document.body.style.overflow = 'auto';
	}

	render() {
		const wrapper = {
			position: 'absolute',
			height: '100%',
			width: '100%'
		}

		const navbarWrapperClassnames = classNames({
			"navbar-wrapper": true,
			"navbar-wrapper--hover-left": this.state.hoverLeft,
			"navbar-wrapper--hover-right": this.state.hoverRight
		});

		const sections = [
		  { name: "Home" },
		  { name: "Story" },
		  { name: "Characters" },
		  { name: "Photos" },
		  { name: "Videos" },
		  { name: "Tickets" }
		]
		
		return (
			<div style={wrapper} className="runway-navigation">
				<Scroller
        scrollRef={ref => this.scroll = ref}
        autoScroll={true}
        autoFrame={true}
        onScrollChange={(scroll) => this.setState({ scroll })}
        >
					{ sections.map((section, index) =>
						<section name={section.name} key={index}/>
					)}
				</Scroller>
				<div className={navbarWrapperClassnames}>
					<ul className="nav navbar-nav navbar-top">
						<li className="nav-left" onMouseEnter={() => this.leftHover(true)} onMouseLeave={() => this.leftHover(false)}>
							<a className="btn_nav_inner" id="trailer">
								<div className="top-line"/>
								<h1>Trailer</h1>
							</a>
						</li>
						<li className="nav-right" onMouseEnter={() => this.rightHover(true)} onMouseLeave={() => this.rightHover(false)}>
							<a className="btn_nav_inner" id="tickets">
								<div className="top-line"/>
								<h1>Tickets</h1>
							</a>
						</li>
					</ul>
					<div className="plane-image">
						<i className="am-icon am-icon-plane2"/>
					</div>
					<ul className="nav navbar-nav navbar-main" id="main-navigation-bar">
						<div className="cd-timeline"/>
						{ this.state.scroll.children.map((child, index) =>
							<li id="nav-home" key={index}>
								<a
								onClick={() => this.scroll.scrollToPosition(child.start)}
		            className={child.active ? ('active ' + 'active-' + sections[index].name.length) : 'inactive'}
			          >
									<div className="nav-inner">
										<span className="left">
											<h6>{sections[index].name}</h6>
										</span>
										<div className="circle"/>
										<span className="right">
											<span className="line"/>
										</span>
									</div>
								</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		)
	}
}

export class RunwayNavigation extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<ScrollProvider>  
				<RunwayNav/>
			</ScrollProvider>
		)
	}
}
