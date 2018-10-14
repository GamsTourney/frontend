import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Image, DropdownButton, MenuItem } from 'react-bootstrap'
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
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <DropdownButton title={'Select Tournament'}>
              <MenuItem eventKey="1" active>Gams 2018</MenuItem>
              <MenuItem eventKey="2">Gams 2019</MenuItem>
            </DropdownButton>
          </Nav>
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
