import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignIn from '../User/SignIn'
import { requestIsLoggedIn } from '../../../store/actions'

class Home extends Component {
	componentDidMount() {
		this.props.requestIsLoggedIn()
	}
	render() {
		if (this.props.isLoggedIn) {
			if (this.props.current_user.email) {
				return (
					<div>
						Vous êtes connecté en tant que {this.props.current_user.email} !
					</div>
				)
			}
			return <div>Vous êtes connecté !</div>
		}
		return (
			<div>
				<p>Hello Stranger</p>
				<SignIn />
			</div>
		)
	}
}

const mapDispatchToProps = { requestIsLoggedIn }
const mapStateToProps = state => ({
	isLoggedIn: state.isLoggedIn,
	current_user: state.current_user,
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
