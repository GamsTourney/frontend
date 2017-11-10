import React, { Component } from 'react'
import './style.css'
import TournamentList from 'modules/tournaments'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Tournament List</h1>
        <TournamentList />
      </div>
    )
  }
}

export default App
