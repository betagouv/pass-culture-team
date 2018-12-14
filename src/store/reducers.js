import initialState from './initialState'

function reducers(state = initialState, action) {
	switch (action.type) {
		case 'RECEIVE_LOGIN_SUCCESS':
			return { isLoggedIn: true, current_user: action.payload }
		case 'RECEIVE_LOGIN_ERROR':
			return { isLoggedIn: false, current_user: null }
		case 'RECEIVE_LOGOUT_SUCCESS':
			return { isLoggedIn: false, current_user: null }
		case 'RECEIVE_LOGOUT_ERROR':
			return { isLoggedIn: false, current_user: null }
		case 'RECEIVE_IS_LOGGED_IN_SUCCESS':
			return { isLoggedIn: true, current_user: action.payload }
		case 'RECEIVE_IS_LOGGED_IN_ERROR':
			return { isLoggedIn: false, current_user: null }
		default:
			return state
	}
}

export default reducers
