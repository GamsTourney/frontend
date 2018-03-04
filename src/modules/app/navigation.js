import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

class Navigation extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Link to='/'>
            <span className='navbar-left'>
              <Image src={require('images/controller.png')} />
            </span>
            <Navbar.Brand>Gams</Navbar.Brand>
            <Navbar.Toggle />
          </Link>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/tournaments/1/live'>
              <NavItem>Live</NavItem>
            </LinkContainer>
            <LinkContainer to='/tournaments/1/schedule'>
              <NavItem>Schedule</NavItem>
            </LinkContainer>
            <LinkContainer to='/games'>
              <NavItem>Games</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
