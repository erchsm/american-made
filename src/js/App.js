import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'

import routes from './routes'

const App = ({ history }) => {
  console.log("This is the process.env", process.env.PUBLIC_URL)
	return (
		<ConnectedRouter history={history}>
			{ routes }
		</ConnectedRouter>
	)
}

export default App
