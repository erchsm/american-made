import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'


export default class Landing extends Component {

	static propTypes = {
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="grid">
					<div className="grid__item grid__item--col-1 grid__item--col-1-desktop grid__item--hide-medium"/>
					<div className="grid__item grid__item--col-5 grid__item--col-12-medium">
					 	<NavLink to="/preloader">
							<div className="card">
								<h2>Preloader</h2>
								<hr/>
								<p>Preloaders can serve to delight and excite the site visitors while they are waiting for the site to load.</p>
							</div>
						</NavLink>
					</div>
					<div className="grid__item grid__item--col-5 grid__item--col-12-medium">
					 	<NavLink to="/video-gallery">
							<div className="card">
								<h2>Video Gallery</h2>
								<hr/>
								<p>To provide a way for users to browse a varible amount of video content our video gallery utilized the Youtube API.</p>
							</div>
						</NavLink>
					</div>
				</div>
				<div className="grid">
					<div className="grid__item grid__item--col-1 grid__item--col-1-desktop grid__item--hide-medium"/>
					<div className="grid__item grid__item--col-5 grid__item--col-12-medium">
					 	<NavLink to="/parallax-story">
							<div className="card">
								<h2>Parallax Story</h2>
								<hr/>
								<p>Our scrolling parallax experience allowed for a rich storytelling moment and told the story in a visually digestable way.</p>
							</div>
						</NavLink>
					</div>
					<div className="grid__item grid__item--col-5 grid__item--col-12-medium">
					 	<NavLink to="/navigation">
							<div className="card">
								<h2>Navigation</h2>
								<hr/>
								<p>The navigation mimics a bird’s-eye view of a plane on an airport runway tarmack waiting to take off. Its minimalistic nature prevents it from blocking content as the user scrolls.</p>
							</div>
						</NavLink>
					</div>
				</div>
			</div>
		);
	}
}
