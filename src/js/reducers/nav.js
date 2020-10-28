const navReducer = (state = true, action) => {
	switch (action.type) {
		case 'SHOWTOGGLE':
			return true
		case 'HIDETOGGLE':
			return false
		default:
			return state
	}
}

export default navReducer