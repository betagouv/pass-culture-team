import React, { Component } from 'react'
import Button from '../../Button'
import { date_long } from '../../../utils/date'

class PendingUserOfferer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			validated: props.item.validationToken ? false : true,
		}
	}

	// handleValidation(item, model) {
	// 	const url =
	// 		process.env.REACT_APP_API_URL +
	// 		'validate?modelNames=' +
	// 		model +
	// 		'&token=' +
	// 		item.validationToken
	// 	// console.log(`PendingUserOfferer.handleValidation() > url = ${url}`)
	// 	// this.props.item.validationToken = null
	// 	// if (makeItDesappear(this.props.offerer)) {
	// 	//   this.props.offerer = {}
	// 	//   this.props.item = {}
	// 	// }
	// 	// // axios.get(url).then(() => (item.validationToken = null))
	// 	// this.setState({ validated: true })
	// }

	render() {
		const { item, offererKey, itemKey, callback } = this.props
		const d = new Date(item.user.dateCreated)
		return (
			<div className="UserOfferer">
				<p>
					{item.user.email}&nbsp;
					{item.validationToken ? (
						<i className="far fa-pause-circle orange" />
					) : (
						<i className="far fa-check-circle ok" />
					)}
				</p>
				<p>
					{item.user.firstName} {item.user.lastName} {'\u00A0'}
					{item.rights === 'admin' && <i className="fa fa-key pc-col" />}
					{item.rights === 'editor' && (
						<i className="fa fa-pencil-alt pc-col" />
					)}
					<br />
					<small>
						a.k.a. {item.user.publicName} | id : {item.userId}
						<br />
						<i>créé le {d.toLocaleDateString('fr-FR', date_long)}</i>
					</small>
				</p>
				{item.validationToken && (
					<Button
						onClick={() => callback(offererKey, itemKey, item, 'UserOfferer')}
						content="Lier cet utilisateur"
					/>
				)}
			</div>
		)
	}
}

export default PendingUserOfferer
