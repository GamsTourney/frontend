import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { get } from 'lodash/object'

import TournamentStandings from '../components/standings'

class TournamentLive extends PureComponent {

  render() {
    const { tournamentId } = this.props

    return (
      <Grid>
        <Row>
          <Col md={7}>
            <Panel bsStyle='primary'>
              <Panel.Heading>Standings</Panel.Heading>
              <Panel.Body><TournamentStandings tournamentId={tournamentId} /></Panel.Body>
            </Panel>
          </Col>
          <Col md={5}>
            <Panel bsStyle='primary'>
              <Panel.Heading>Up Next</Panel.Heading>
              <Panel.Body>TODO</Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Panel bsStyle='primary'>
              <Panel.Heading>Other Stats</Panel.Heading>
              <Panel.Body>TODO</Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

TournamentLive.propTypes = {
  tournamentId: PropTypes.string.isRequired,
}

function mapStateToProps(state, props) {
  const tournamentId = get(props, 'match.params.id')

  return {
    tournamentId,
  }
}

export default connect(mapStateToProps)(TournamentLive)
