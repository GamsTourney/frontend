import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchTournaments } from "../actions"

class TournamentList extends PureComponent {

  componentWillMount() {
    this.props.actions.fetchTournaments()
  }

  renderData() {
    return (
      <ul>
        {
          this.props.tournaments.map((t) =>
            <li key={t.id}>{t.name}</li>
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
    actions: bindActionCreators({
      fetchTournaments
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentList)
