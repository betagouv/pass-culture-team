import { put, takeEvery } from 'redux-saga/effects'
import axios from '../axios'
import history from '../history'
import * as actions from './actions'

function* requestLogin(action) {
	try {
		const resp = yield axios.post('users/signin', action.payload, {
			withCredentials: true,
		})
		yield put(actions.receiveLoginSuccess(resp.data))
		history.push('/pending-validations')
	} catch (err) {
		yield put(actions.receiveLoginError(err))
		history.push('/')
	}
}

function* requestLogout() {
	try {
		const resp = yield axios.get('users/signout', { withCredentials: true })
		yield put(actions.receiveLogoutSuccess(resp.data))
		history.push('/')
	} catch (err) {
		yield put(actions.receiveLogoutError(err))
		history.push('/')
	}
}

function* requestIsLoggedIn() {
	try {
		const resp = yield axios.get('users/current', { withCredentials: true })
		yield put(actions.receiveIsLoggedInSuccess(resp.data))
	} catch (err) {
		yield put(actions.receiveIsLoggedInError(err))
	}
}

// WATCHER : watch for dispatched actions, spawn new tasks
export function* sagas() {
	yield takeEvery('REQUEST_LOGIN', requestLogin)
	yield takeEvery('REQUEST_LOGOUT', requestLogout)
	yield takeEvery('REQUEST_IS_LOGGED_IN', requestIsLoggedIn)
}
