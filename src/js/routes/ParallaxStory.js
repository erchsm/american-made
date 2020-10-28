import React, { Component, Fragment } from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';

import JumboRingButton from '../components/JumboRingButton';
import { ParallaxProvider, Parallax } from '../components/Parallax';

export default class ParallaxStory extends Component {
	render() {
		
		const getRandomInt = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		return (
			<div className="parallax-story">
				<ParallaxProvider>
					<main>
						<JumboRingButton animate/>
						<Parallax
						offsetYMin={-(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						offsetYMax={(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						slowerScrollRate={true}
						>
							<div className="story-headline">
								<h2>Guns, Drugs & Money Laundering?</h2>
								<hr/>
								<h2>Barry, Youve Hit the Trifecta</h2>
							</div>
						</Parallax>
						<Parallax
						offsetXMin={-(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						offsetXMax={(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						slowerScrollRate={true}>
							<img id="cloud5" src="../assets/img/_story/s06-cloud5.png"></img>
						</Parallax>
						<Parallax
						offsetXMin={-(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						offsetXMax={(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						slowerScrollRate={true}>
							<img id="cloud6" src="../assets/img/_story/s06-cloud6.png"></img>
						</Parallax>
						<Parallax
						offsetXMin={-(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						offsetXMax={(getRandomInt(50, 150)) * (1 + 1) + 'px'}
						slowerScrollRate={true}>
							<img id="cloud7" src="../assets/img/_story/s06-cloud7.png"></img>
						</Parallax>
						<video loop muted autoPlay>
							<source src="../assets/img/_story/s06-fg-plane.webm" type="video/webm"></source>
						</video>
					</main>
				</ParallaxProvider>
			</div>
		);
	}
}

