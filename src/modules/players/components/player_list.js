import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { values } from 'lodash/object'

import { fetchPlayers } from '../actions'


class PlayerList extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchPlayers()
  }

  renderData() {
    const { players } = this.props

    return (
      <ul>
        {
          players.map((t) =>
            <li key={t.id}>{t.name}</li>
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
  players: PropTypes.array
}

PlayerList.defaultProps = {
  players: []
}

function mapStateToProps(state) {
  return {
    players: values(state.players)
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
