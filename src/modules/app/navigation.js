import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Navbar,
  Nav,
  NavItem,
  Image
} from 'react-bootstrap'
import TournamentDropdown from 'modules/tournaments/components/dropdown'
import { selectTournamentId } from 'modules/tournaments/selectors'

class Navigation extends Component {
  render() {
    const { tournamentId } = this.props

    return (
      <Navbar>
        <Navbar.Header>
          <Link to='/'>
            <span className='navbar-left'>
              <Image src={require('images/controller.png')} />
            </span>
            <Navbar.Brand>Gams</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <TournamentDropdown />
          <Nav>
            <LinkContainer to={`/tournaments/${tournamentId}/live`}>
              <NavItem>Live</NavItem>
            </LinkContainer>
            <LinkContainer to={`/tournaments/${tournamentId}/schedule`}>
              <NavItem>Schedule</NavItem>
            </LinkContainer>
            <LinkContainer to={`/tournaments/${tournamentId}/games`}>
              <NavItem>Games</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  tournamentId: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    tournamentId: selectTournamentId(state)
  }
}

export default connect(mapStateToProps)(Navigation)
