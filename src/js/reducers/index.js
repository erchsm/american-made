import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import navReducer from './nav'

const rootReducer = (history) => combineReducers({
	nav: navReducer,
	router: connectRouter(history)
})

export default rootReducer
