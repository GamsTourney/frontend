import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { values } from 'lodash/object'

import { fetchGames } from '../actions'

class GameDetail extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchGames()
  }

  renderData() {
    const { games } = this.props

    return (
      <ul>
        {
          games.map((t) =>
            <li key={t.id}>{t.name}</li>
          )
        }
      </ul>
    )
  }

  render() {
    const { games } = this.props

    return (
      <div>
        { games.length > 0 ?
          this.renderData() :
          <div className="">
            No Data
          </div>
        }
      </div>
    )
  }
}

GameDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  games: PropTypes.array
}

GameDetail.defaultProps = {
  games: []
}

function mapStateToProps(state) {
  return {
    games: values(state.games)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchGames
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail)
