import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlayers } from "../actions"

class PlayerList extends PureComponent {

  componentWillMount() {
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
      <div className="">
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
  const { players } = state

  return {
    players
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
