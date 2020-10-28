import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

import JumboRingButton from '../components/JumboRingButton';


export default class Preloader extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			percentLoaded: 0,
			animateOut: false,
		}
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			if (this.state.percentLoaded < 125) {
				this.setState(prevState => ({
					percentLoaded: prevState.percentLoaded + 0.075,
				}))
			} else {
				clearInterval(this.interval);
				this.setState({
					animateOut: true
				})
			}
		}, 1);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	

	render() {
		
		const classnames = classNames({
			"splash": true,
			"splash--animating": this.state.animateOut
		});

		return (
			<div className={classnames}>
				<h1><p className="trigger-headline"><span>T</span> <span>h</span> <span>e</span> <span>&nbsp;</span> <span>S</span> <span>k</span> <span>y</span></p><p id="story_text2" className="trigger-headline1"><span>I</span> <span>s</span> <span>&nbsp;</span> <span>N</span> <span>e</span> <span>v</span> <span>e</span> <span>r</span></p><p id="story_text3" className="trigger-headline2"><span>T</span> <span>h</span> <span>e</span></p><p id="story_text4" className="trigger-headline3"><span>L</span> <span>i</span> <span>m</span> <span>i</span> <span>t</span></p></h1>
				<JumboRingButton animate={this.state.animateOut}/>
				<div id="preloader" className={classNames({
		      "animating": true,
		      "animate-out": this.state.animateOut
		    })}>
					<div id="preloader-container">
						<div id="preloader-content">
							<div className="preloader-tt">
								<i className="am-icon am-icon--sm am-icon-a1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-m1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-e1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-r1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-i1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-c1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-a2-thin"></i>
								<i className="am-icon am-icon--sm am-icon-n1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-m1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-a1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-d1-thin"></i>
								<i className="am-icon am-icon--sm am-icon-e1-thin"></i>
							</div>
						</div>
						<div id="loader3">
							<div>
								<i id="backgroundimage" className="am-icon am-icon-plane"></i> 
								<div id="preloaderLine"></div>
							</div>
						</div>
						<div id="preloader-loading">
							<div className="preloader-loading-text">
								<span id="preloader-loading-text">{Math.min(Math.floor(this.state.percentLoaded), 100)}</span>%
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

// export class Preloader extends Component {
	
// 	constructor(props) {
// 		super(props);
// 	}

// 	render() {
		
// 		const { animateOut } = this.props;
		
// 		const classnames = classNames({
// 			"animating": true,
// 			"animate-out": animateOut
// 		});
		
// 		return (
			
// 		)
// 	}
// }
