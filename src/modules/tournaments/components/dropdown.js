import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap'

import { selectTournaments } from 'selectors/collections'
import { fetchTournaments, changeActiveTournament } from '../actions'
import { selectTournament } from '../selectors'
import { getHistory } from 'routes/history'

const history = getHistory()

class TournamentDropdown extends PureComponent {

  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchTournaments()
  }

  handleSelect(e) {
    this.props.actions.changeActiveTournament(e)
    history.push(`/tournaments/${e.id}/live`)
  }

  render() {
    const { tournament, tournaments } = this.props

    return (
      <Nav pullRight onSelect={this.handleSelect}>
        <NavDropdown
          id='active-tournament'
          title={tournament.name || 'Tournament'}
          onChange={this.handleChange}
        >
          {
            map(tournaments, (t) => (
              <MenuItem key={t.id} eventKey={t}>{ t.name }</MenuItem>
            ))
          }
        </NavDropdown>
      </Nav>
    )
  }
}

TournamentDropdown.propTypes = {
  actions: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  tournaments: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    tournament: selectTournament(state),
    tournaments: selectTournaments(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeActiveTournament,
      fetchTournaments
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDropdown)
