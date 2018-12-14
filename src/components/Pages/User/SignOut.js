import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestLogout } from '../../../store/actions'

class SignOut extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.requestLogout}>Déconnexion</button>
			</div>
		)
	}
}

const mapDispatchToProps = { requestLogout }
export default connect(
	null,
	mapDispatchToProps
)(SignOut)
