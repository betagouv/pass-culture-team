import React, { Component } from 'react'
import Button from '../../Button'
import LinkBlank from '../../PCLink'
import SireneInfos from './SireneInfos'
import { date_long } from '../../../utils/date'
import {
	getColorByDpt,
	getDptByCode,
	getDptCodeFromZipcode,
} from '../../../utils/geographic'

class PendingOfferer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			validated: props.offerer.validationToken ? false : true,
		}
	}
	renderDptButton(offerer) {
		if (offerer.postalCode) {
			const dpt = getDptCodeFromZipcode(offerer.postalCode)
			return (
				<Button
					content={dpt + ' - ' + getDptByCode(dpt)}
					color={getColorByDpt(dpt)}
				/>
			)
		}
		return <Button content="N/A" color="white" />
	}

	render() {
		let { offerer, offererKey, callback } = this.props
		const d = new Date(offerer.dateCreated)
		const proLink = `https://pro.passculture.beta.gouv.fr/structures/${
			offerer.id
		}`
		return (
			<div className={offerer.isActive ? 'Offerer done' : 'Offerer waiting'}>
				<h3>
					<LinkBlank
						url={proLink}
						style={{ color: 'black' }}
						content={offerer.name}
					/>
					&nbsp;
					{offerer.validationToken ? (
						<i className="far fa-pause-circle orange" />
					) : (
						<i className="far fa-check-circle ok" />
					)}
				</h3>
				{this.renderDptButton(offerer)}
				<p>
					<small>
						{offerer.address}, {offerer.postalCode} {offerer.city}
						<br />
						<i>
							id: <LinkBlank url={proLink} content={offerer.id} />
							{' | '}
							siren:&nbsp;
							<LinkBlank
								url={`https://entreprise.data.gouv.fr/etablissement/${
									offerer.siren
								}`}
								content={offerer.siren}
							/>
						</i>
						<br />
						<i>créé le {d.toLocaleDateString('fr-FR', date_long)}</i>
					</small>
				</p>
				<SireneInfos key={offerer.siren} siren={offerer.siren} />
				{offerer.validationToken && (
					<Button
						onClick={() => callback(offererKey, offererKey, offerer, 'Offerer')}
						content="Valider la structure"
					/>
				)}
			</div>
		)
	}
}

export default PendingOfferer
