import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import Header from './components/Layout/Layout'
import Home from './components/Pages/Home/Home'
import SignIn from './components/Pages/User/SignIn'
import PendingValidations from './components/Pages/PendingValidations/PendingValidations'
import Maps from './components/Pages/Maps/Maps'
// import logo from './logo.png';
import history from './history'
import './styles/App.css'
import store from './store'

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<Provider store={store}>
					<div className="App">
						<Header />
						<section className="content">
							<Route exact path="/" component={Home} />
							<Route path="/signin" component={SignIn} />
							<Route
								path="/pending-validations"
								component={PendingValidations}
							/>
							<Route path="/carto" component={Maps} />
						</section>
						{/*<Footer /> */}
					</div>
				</Provider>
			</Router>
		)
	}
}

export default App
