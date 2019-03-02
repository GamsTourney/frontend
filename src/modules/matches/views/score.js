import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import isEmpty from 'lodash/isEmpty'

import MatchRankScore from '../components/score/rank'
import MatchManualScore from '../components/score/manual'
import { fetchMatch } from '../actions'
import {
  selectMatchId,
  selectMatch
} from '../selectors'
import { SCORE_TYPES } from '../constants'
import '../styles.css'

class MatchScore extends PureComponent {

  componentDidMount() {
    const { matchId } = this.props
    this.props.actions.fetchMatch(matchId)
  }

  render() {
    const { match } = this.props

    if (isEmpty(match)) {
      return null
    }

    return (
      match.score_type === SCORE_TYPES.RANK ?
      <MatchRankScore match={match} /> :
      <MatchManualScore match={match} />
    )
  }
}

MatchScore.propTypes = {
  match: PropTypes.object
}

MatchScore.defaultProps = {
  match: null
}

function mapStateToProps(state, props) {
  return {
    matchId: selectMatchId(state, props),
    match: selectMatch(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchMatch
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchScore)
