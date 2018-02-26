import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { values } from 'lodash/object'

import { selectTournaments } from 'selectors/collections'
import { fetchTournaments } from '../actions'

class TournamentLive extends PureComponent {

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

TournamentLive.propTypes = {
  actions: PropTypes.object.isRequired,
  tournaments: PropTypes.array
}

TournamentLive.defaultProps = {
  tournaments: []
}

function mapStateToProps(state) {
  return {
    tournaments: values(selectTournaments(state))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchTournaments
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentLive)
