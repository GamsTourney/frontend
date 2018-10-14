import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { values } from 'lodash/object'

import { selectPlayers } from 'selectors/collections'
import { selectTournamentId } from 'modules/tournaments/selectors'
import { fetchPlayers } from '../actions'

class PlayerList extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchPlayers(this.props.tournamentId)
  }

  renderData() {
    const { players } = this.props

    return (
      <ul>
        {
          players.map((p) =>
            <li key={p.id}>
              <Link to={`/players/${p.id}`}>
                {p.name}
              </Link>
            </li>

          )
        }
      </ul>
    )
  }

  render() {
    const { players } = this.props

    return (
      <div>
        { players.length > 0 ?
          this.renderData() :
          <div className="">
            No Data
          </div>
        }
      </div>
    )
  }
}

PlayerList.propTypes = {
  actions: PropTypes.object.isRequired,
  tournamentId: PropTypes.string.isRequired,
  players: PropTypes.array
}

PlayerList.defaultProps = {
  players: []
}

function mapStateToProps(state) {
  return {
    tournamentId: selectTournamentId(state),
    players: values(selectPlayers(state))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPlayers
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList)
