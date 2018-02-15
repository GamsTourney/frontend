import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash/object'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

import { fetchPlayer } from '../actions'
import PlayerAvatar from '../components/avatar'

const DemoChart = () => {
  const placeholderData = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
  ]

  return (
    <BarChart width={600} height={300} data={placeholderData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey="pv" fill="#8884d8"/>
      <Bar dataKey="uv" fill="#82ca9d"/>
    </BarChart>
  )
}

const PlayerMatches = ({ matches }) => {
  return matches.map((match) => (
    <div key={match.id}>{`Game ${match.game_id} at ${match.start_time}`}</div>
  ))
}

class PlayerDetail extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchPlayer(this.props.playerId)
  }

  render() {
    const { player } = this.props

    if(!player) {
      return null
    }

    const { matches } = player

    return (
      <Grid>
        <Row>
          <Col xs={4}>
            <Panel bsStyle="primary">
              <Panel.Heading>{player.name}</Panel.Heading>
              <PlayerAvatar
                className='player-avatar'
                player={player}
                rounded
              />
              <Panel.Body></Panel.Body>
            </Panel>
          </Col>
          <Col xs={8}>
            <Panel bsStyle="primary">
              <Panel.Heading>Upcoming Matches</Panel.Heading>
              <Panel.Body><PlayerMatches matches={matches} /></Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Panel bsStyle="primary">
              <Panel.Heading>Stats</Panel.Heading>
              <Panel.Body><DemoChart /></Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

PlayerDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  player: PropTypes.object
}

PlayerDetail.defaultProps = {
  player: null
}

function mapStateToProps(state, props) {
  const playerId = Number(get(props, 'match.params.id'))

  return {
    playerId,
    player: state.players[playerId]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPlayer
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetail)
