import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LinkBlank } from '../PCLink'
import SignOut from '../Pages/User/SignOut'
import { requestIsLoggedIn } from '../../store/actions'

export class NavBar extends Component {
	render() {
		if (this.props.isLoggedIn) {
			return (
				<nav className="NavBar">
					<ul>
						<li>
							<SignOut />
						</li>
						<li>
							<NavLink to="/pending-validations">
								Validations en attente
							</NavLink>
						</li>
						<li>
							<NavLink to="/carto">Cartos</NavLink>
						</li>
					</ul>
				</nav>
			)
		}
		return (
			<nav className="NavBar">
				<ul>
					<li>
						<NavLink to="/signin">Connexion</NavLink>
					</li>
				</ul>
			</nav>
		)
	}
}

class Header extends Component {
	componentDidMount() {
		this.props.requestIsLoggedIn()
	}
	render() {
		return (
			<header className="Header">
				<NavLink to="/" className="mainTitle">
					<h1>PC TEAM</h1>
				</NavLink>
				<NavBar isLoggedIn={this.props.isLoggedIn} />
			</header>
		)
	}
}

export const Footer = () => {
	return (
		<footer className="Footer">
			<LinkBlank
				url="https://pass.culture.fr/"
				title="pass Culture"
				target="_blank"
				content="pass.culture.fr"
			/>
		</footer>
	)
}

const mapDispatchToProps = { requestIsLoggedIn }
const mapStateToProps = state => ({ isLoggedIn: state.isLoggedIn })

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
