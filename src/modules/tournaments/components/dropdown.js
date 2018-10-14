import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { changeActiveTournament } from '../actions'

class TournamentDropdown extends PureComponent {

  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e) {
    this.props.actions.changeActiveTournament(e)
  }

  render() {
    return (
      <Nav pullRight onSelect={this.handleSelect}>
        <NavDropdown
          id='active-tournament'
          title='Tournament'
          onChange={this.handleChange}
        >
          <MenuItem eventKey={{ id: '1' }}>Gams 2018</MenuItem>
          <MenuItem eventKey={{ id: '2' }}>Gams 2019</MenuItem>
        </NavDropdown>
      </Nav>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeActiveTournament
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(TournamentDropdown)
