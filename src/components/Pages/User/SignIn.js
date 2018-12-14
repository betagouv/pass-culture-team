import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { requestLogin, requestIsLoggedIn } from '../../../store/actions'
import '../../../styles/Form.css'

class SignIn extends Component {
	componentDidMount() {
		this.props.requestIsLoggedIn()
	}
	render() {
		return (
			<div>
				<p>Veuillez utiliser vos identifiants PC Pro pour vous connecter :</p>
				<Form
					onSubmit={data => this.props.requestLogin(data)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Field
								name="identifier"
								component="input"
								type="text"
								id="identifier"
								placeholder="email"
							/>
							<Field
								name="password"
								component="input"
								type="password"
								id="password"
								placeholder="mot de passe"
							/>
							<button type="submit">OK</button>
						</form>
					)}
				/>
			</div>
		)
	}
}

const mapDispatchToProps = { requestLogin, requestIsLoggedIn }
export default connect(
	null,
	mapDispatchToProps
)(SignIn)
