import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PureComponent } from 'react'
import * as tournamentActions from '../../actions/tournamentActions'
import PropTypes from 'prop-types'
import React from 'react'

class TournamentList extends PureComponent {

  componentWillMount() {
    this.props.tournamentActions.fetchTournaments()
  }

  // TODO: API should return ID to use as key
  renderData() {
    return (
      <ul>
        {
          this.props.tournaments.map((t) =>
            <li key={t.url}>{t.name}</li>
          )
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="">
          {this.props.tournaments.length > 0 ?
            this.renderData() :
            <div className="">
              No Data
            </div>
          }
      </div>
    )
  }
}

TournamentList.propTypes = {
  tournamentActions: PropTypes.object,
  tournaments: PropTypes.array
}

function mapStateToProps(state) {
  return {
    tournaments: state.tournaments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tournamentActions: bindActionCreators(tournamentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentList)
