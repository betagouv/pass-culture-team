import React, { Component } from 'react'
import '../../../styles/App.css'
import axios from '../../../axios'
import { capitalize } from '../../../utils/strings'
import { date_short } from '../../../utils/date'
import { getNafName } from '../../../utils/sireneUtils'

// const keep = [
// 	"nom_raison_sociale",
// 	"enseigne",
// 	"departement",
// 	"etablissement_public_cooperation_intercommunale",
// 	"libelle_region",
// 	"libelle_nature_juridique_entreprise",
// 	"libelle_activite_principale_entreprise",
// 	"libelle_tranche_effectif_salarie_entreprise",
// 	"date_creation_entreprise",
// 	"telephone",
// 	"email",
// 	"activite_principale_registre_metier",
// 	"premiere_activite_secondaire_entreprise_esa",
// 	"deuxieme_activite_secondaire_entreprise_esa",
// 	"troisieme_activite_secondaire_entreprise_esa",
// 	"quatrieme_activite_secondaire_entreprise_esa",
// 	"date_mise_a_jour"
// ];

const activities = [
	'libelle_activite_principale_entreprise',
	// "activite_principale_registre_metier",
	// "premiere_activite_secondaire_entreprise_esa",
	'deuxieme_activite_secondaire_entreprise_esa',
	'troisieme_activite_secondaire_entreprise_esa',
	'quatrieme_activite_secondaire_entreprise_esa',
]

class SireneInfos extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: null,
			comcom: null,
		}
	}

	componentDidMount() {
		if (this.props.siren === null) {
			return
		}
		axios
			.get(
				'https://entreprise.data.gouv.fr/api/sirene/v1/siren/' +
					this.props.siren
			)
			.then(resp => {
				// console.log(`SireneInfos.componentDidMount() for `, resp.data)
				this.setState({ data: resp.data })
				axios
					.get(
						'https://entreprise.data.gouv.fr/api/sirene/v1/siren/' +
							resp.data.siege_social
								.etablissement_public_cooperation_intercommunale
					)
					.catch(e => {
						// console.log(
						// 	`SireneInfos.componentDidMount > second request error : `,
						// 	e
						// )
						this.setState({ comcom: 'N/A' })
					})
					.then(resp =>
						this.setState({ comcom: resp.data.siege_social.nom_raison_sociale })
					)
			})
			.catch(e => {
				// console.log(`SireneInfos.componentDidMount > first request error : `, e)
				this.setState({ data: null })
			})
	}

	getName = () => this.state.data.siege_social.nom_raison_sociale

	getComcom = () =>
		this.state.data.siege_social.etablissement_public_cooperation_intercommunale

	getSiege = () => this.state.data.siege_social

	getCreationDate() {
		const date = this.state.data.siege_social.date_creation_entreprise
		return date.slice(-2) + '/' + date.slice(-4, -2) + '/' + date.slice(-8, -4)
	}

	renderActivities() {
		const siege = this.getSiege()
		const [firstActivity, ...otherActivities] = activities

		const first = (
			<p>
				<strong>{siege[firstActivity]}</strong>
			</p>
		)
		const others = otherActivities.map(
			(k, index) =>
				siege[k] && (
					<p key={index}>
						<i>Autre activité : {getNafName(siege[k])}</i>
					</p>
				)
		)
		return (
			<small>
				{first}
				{others}
			</small>
		)
	}

	render() {
		if (this.props.siren === null) {
			return (
				<div className="SireneInfos">
					<p className="orange">Aucun SIREN indiqué</p>
				</div>
			)
		}
		const siege = this.state.data ? this.state.data.siege_social : null
		if (!siege) {
			return (
				<div className="SireneInfos">
					<p className="red">inconnu dans la base SIREN</p>
				</div>
			)
		}
		return (
			<div className="SireneInfos">
				<p>
					{siege.enseigne && <i>a.k.a. {siege.enseigne}</i>}
					<br />
					<small>
						EPCI: <span className="bold">{capitalize(this.state.comcom)}</span>
						<br />
						Statut: {siege.libelle_nature_juridique_entreprise}
						<br />
						<i className="fa fa-users" label="salariés" />{' '}
						{siege.libelle_tranche_effectif_salarie_entreprise.replace(
							/\ssalarié[s]*/g,
							''
						)}
						&nbsp;
						<i className="fa fa-haykal" /> {this.getCreationDate()}&nbsp;
						<i className="fa fa-sync" />{' '}
						{new Date(siege.date_mise_a_jour).toLocaleDateString(
							'fr-FR',
							date_short
						)}
					</small>
				</p>
				{this.renderActivities()}
			</div>
		)
	}
}

export default SireneInfos
