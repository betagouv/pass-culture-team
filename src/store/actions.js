// LOGIN
export function requestLogin(data) {
	return { type: 'REQUEST_LOGIN', payload: data }
}

export function receiveLoginSuccess(data) {
	return { type: 'RECEIVE_LOGIN_SUCCESS', payload: data }
}

export function receiveLoginError(err) {
	return { type: 'RECEIVE_LOGIN_ERROR', payload: err }
}

// LOGOUT
export function requestLogout(data) {
	return { type: 'REQUEST_LOGOUT', payload: data }
}

export function receiveLogoutSuccess(data) {
	return { type: 'RECEIVE_LOGOUT_SUCCESS', payload: data }
}

export function receiveLogoutError(err) {
	return { type: 'RECEIVE_LOGOUT_ERROR', payload: err }
}

// CHECK IF SOME USER IS LOGGED IN
export function requestIsLoggedIn(data) {
	return { type: 'REQUEST_IS_LOGGED_IN', payload: data }
}

export function receiveIsLoggedInSuccess(data) {
	return { type: 'RECEIVE_IS_LOGGED_IN_SUCCESS', payload: data }
}

export function receiveIsLoggedInError(err) {
	return { type: 'RECEIVE_IS_LOGGED_IN_ERROR', payload: err }
}
