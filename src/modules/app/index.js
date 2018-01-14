import React, { Component } from 'react'
import './style.scss'
import PlayerList from 'modules/players'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Player List</h1>
        <PlayerList />
      </div>
    )
  }
}

export default App
