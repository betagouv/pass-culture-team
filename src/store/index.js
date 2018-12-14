import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import initialState from './initialState'
import { sagas } from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducers,
	initialState,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

// DEBUG
window.store = store

export default store
