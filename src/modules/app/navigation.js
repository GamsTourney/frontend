import React, { Component } from 'react'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Navigation extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Gams</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to='/players'>
            <NavItem>Players</NavItem>
          </LinkContainer>
          <LinkContainer to='/games'>
            <NavItem>Games</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation
