import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestIsLoggedIn } from '../../../store/actions'

class Maps extends Component {
	componentDidMount() {
		this.props.requestIsLoggedIn()
	}
	render() {
		if (this.props.isLoggedIn === true) {
			return <div>Bientôt, des belles cartes</div>
		}
		return <div>Vous devez être connecté</div>
	}
}

const mapDispatchToProps = { requestIsLoggedIn }
const mapStateToProps = state => ({ isLoggedIn: state.isLoggedIn })

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Maps)
