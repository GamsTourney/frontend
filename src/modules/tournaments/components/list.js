import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { values } from 'lodash/object'

import { fetchTournaments } from '../actions'

class TournamentList extends PureComponent {

  componentWillMount() {
    this.props.actions.fetchTournaments()
  }

  renderData() {
    const { tournaments } = this.props

    return (
      <ul>
        {
          tournaments.map((t) =>
            <li key={t.id}>{t.name}</li>
          )
        }
      </ul>
    )
  }

  render() {
    const { tournaments } = this.props

    return (
      <div className="">
        { tournaments.length > 0 ?
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
  actions: PropTypes.object.isRequired,
  tournaments: PropTypes.array
}

TournamentList.defaultProps = {
  tournaments: []
}

function mapStateToProps(state) {
  return {
    tournaments: values(state.tournaments)
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
