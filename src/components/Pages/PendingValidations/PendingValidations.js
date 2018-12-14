import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios'
import '../../../styles/App.css'
import PendingOfferer from './PendingOfferer'
import PendingUserOfferer from './PendingUserOfferer'
import Button from '../../Button'
import { regions } from '../../../utils/geographic'
import { getDptCodeFromZipcode } from '../../../utils/geographic'
import { requestIsLoggedIn } from '../../../store/actions'

function makeItDesappear(offerer) {
  if (offerer.validationToken) {
    return false
  }
  return offerer['UserOfferers'].map(d => {
    if (d.validationToken) {
      return false
    }
    return true
  })
}

const PendingItem = ({ offererKey, offerer, callback }) => {
  return (
    <div id={offerer.id} className="PendingItem">
      <PendingOfferer
        offerer={offerer}
        offererKey={offererKey}
        callback={callback}
      />
      {offerer.UserOfferers.map((d, index) => (
        <PendingUserOfferer
          key={index}
          item={d}
          itemKey={index}
          offerer={offerer}
          offererKey={offererKey}
          callback={callback}
        />
      ))}
    </div>
  )
}

class PendingValidations extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: [],
      region: 'Tout',
      view: 'grid',
      data: [],
    }

    axios
      .get('exports/pending_validation', { withCredentials: true })
      .then(resp => this.handleResponse(resp))
      .catch(e => this.handleResponse(e.response))
  }
  componentDidMount() {
    this.props.requestIsLoggedIn()
  }

  makeRegionButtons() {
    return Object.keys(regions).map((r, index) => (
      <Button
        key={index}
        onClick={e => this.changeFilter(r)}
        content={r}
        color={regions[r].color}
      />
    ))
  }

  handleResponse(resp) {
    switch (resp.status) {
      case 403:
        this.setState({ data: [], status: 'Vous devez être admin' })
        break
      case 200:
        this.setState({
          data: resp.data
            ? resp.data.sort(
                (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
              )
            : resp.data,
          status: 'ok',
        })
        break
      default:
        this.setState({ data: [], status: 'Vous devez être connecté' })
    }
  }

  handleValidation(offererKey, itemKey, item, model) {
    const url =
      process.env.REACT_APP_API_URL +
      'validate?modelNames=' +
      model +
      '&token=' +
      item.validationToken
    axios
      .get(url)
      .then(resp => {
        let state = { ...this.state }
        if (model === 'UserOfferer') {
          state.data[offererKey][itemKey].validationToken = null
        } else {
          state.data[offererKey].validationToken = null
        }
        if (makeItDesappear(this.state.data[offererKey])) {
          state.data.splice(offererKey, 1)
        }
        this.setState(state)
      })
      .catch(e => undefined)
  }

  changeFilter(newFilter) {
    this.setState({ region: newFilter, filter: regions[newFilter].dpt })
  }

  renderPendingItemInline = (d, index) => (
    <PendingItem
      key={index}
      offerer={d}
      offererKey={index}
      callback={(...args) => this.handleValidation(...args)}
    />
  )

  renderPendingItemGrid = (d, index) => (
    <PendingItem
      key={index}
      offerer={d}
      offererKey={index}
      callback={(...args) => this.handleValidation(...args)}
    />
  )

  // Prepare pendingList according to filters
  filteredList = () => {
    if (this.state.filter.length > 0) {
      return this.state.data.filter(d =>
        this.state.filter.includes(getDptCodeFromZipcode(d.postalCode))
      )
    }
    return this.state.data
  }

  // Render list or message according to request status, filters and selected view.
  renderListIfOk = () => {
    if (this.state.status !== 'ok') {
      return <div>{this.state.status}</div>
    }
    let pendingList = this.filteredList()
    if (pendingList.length === 0) {
      return <div style={{ textAlign: 'center' }}>Rien à valider</div>
    }
    if (this.state.view === 'grid') {
      return pendingList.map(this.renderPendingItemGrid)
    }
    return pendingList.map(this.renderPendingItemInline)
  }

  // Warning: if d.postalCode does not have the leading 0, it will not be able to find the correct department.
  render() {
    return (
      <div className="Pending">
        <h1>Validations en attente : {this.state.region}</h1>
        <div className="buttonList">{this.makeRegionButtons()}</div>
        {this.renderListIfOk()}
      </div>
    )
  }
}

const mapDispatchToProps = { requestIsLoggedIn }
export default connect(
  null,
  mapDispatchToProps
)(PendingValidations)
