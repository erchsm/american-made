import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { useLocation } from 'react-router-dom'

import VideoGallery from './VideoGallery'
import ParallaxStory from './ParallaxStory'
import Preloader from './Preloader'
import { RunwayNavigation, RunwayNav } from './RunwayNavigation'

import Landing from './process-site/Landing'
// import Colors from './process-site/Colors'
// import Typography from './process-site/Typography'
// import Animation from './process-site/Animation'
// import Prototypes from './process-site/Prototypes'
// import Accessibility from './process-site/Accessibility'

// import HomeNavPrototype from './prototypes/HomeNavPrototype'
// import HomeArticlePrototype from './prototypes/HomeArticlePrototype'
// import HomeLinksPrototype from './prototypes/HomeLinksPrototype'
// import HomeProfileSetupPrototype from './prototypes/HomeProfileSetupPrototype'
// import HomeSitemapPrototype from './prototypes/HomeSitemapPrototype'
// import HomeLandingPrototype from './prototypes/HomeLandingPrototype'

// import MdcNavPrototype from './prototypes/MdcNavPrototype'
// import MdcTaxonomyDiagramPrototype from './prototypes/MdcTaxonomyDiagramPrototype'
// import MdcFlipperPrototype from './prototypes/MdcFlipperPrototype'
// import MdcCompanyPickerPrototype from './prototypes/MdcCompanyPickerPrototype'
// import MdcButtonsPrototype from './prototypes/MdcButtonsPrototype'


const routes = (
	<Switch>
		<Route exact path="/" component={Landing}/>
		{/*<Route exact path="/american-made/" component={Landing}/>*/}

		<Route path="/video-gallery" component={VideoGallery}/>
		{/*<Route path="/american-made/video-gallery" component={VideoGallery}/>*/}

		<Route path="/parallax-story" component={ParallaxStory}/>
		{/*<Route path="/american-made/parallax-story" component={ParallaxStory}/>*/}

		<Route path="/preloader" component={Preloader}/>
		{/*<Route path="/american-made/preloader" component={Preloader}/>*/}

		<Route path="/navigation" component={RunwayNav}/>
		{/*<Route path="/american-made//navigation" component={RunwayNav}/>*/}
	</Switch>
)

export default routes
