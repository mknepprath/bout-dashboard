import React, { Component } from 'react'
import './App.css'

// Available items and moves
const itemData = {
  fists: {
    move: 'punch',
    minDamage: 1,
    maxDamage: 3,
    accuracy: 1
  },
  stick: {
    move: 'swing',
    minDamage: 1,
    maxDamage: 4,
    accuracy: 0.8
  },
  rock: {
    move: 'throw',
    minDamage: 1,
    maxDamage: 5,
    accuracy: 0.6
  },
  sword: {
    move: 'slash',
    minDamage: 2,
    maxDamage: 6,
    accuracy: 0.5
  }
}

class App extends Component {
  constructor () {
    super()
    this.attack = () => {
      const {turn, nextTurn} = this.state
      const {weapon} = this.state[turn]
      const {move, minDamage: min, maxDamage: max, accuracy} = itemData[weapon]
      let nextState = {}

      console.log('attacking ' + turn + ' uses ' + move + ' with ' + weapon + '!')

      if (Math.random() <= accuracy) {
        // If attack hits, update health of other player
        let nextPlayerState = {...this.state[nextTurn]}
        const damage = Math.floor(Math.random() * (max - min + 1)) + min
        nextPlayerState.health -= damage

        // Update turn
        nextState = {...this.state, [nextTurn]: nextPlayerState}
      } else {
        // If attack misses, other player stats are unchanged
        nextState = {...this.state}
      }
      nextState.turn = nextTurn
      nextState.nextTurn = turn

      // Update state
      this.setState(nextState)
    }
    this.getWeapon = () => {
      // Returns a random item
      const items = Object.keys(itemData)
      return items[Math.floor(Math.random() * (items.length))]
    }
    this.state = {
      p1: {
        health: 12,
        weapon: this.getWeapon()
      },
      p2: {
        health: 12,
        weapon: this.getWeapon()
      },
      turn: 'p2',
      nextTurn: 'p1'
    }
  }
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to Bout</h2>
        </div>
        <p className='App-intro'>
          Time to battle!
        </p>
        <button onClick={this.attack} disabled={this.state.turn !== 'p1'}>Player 1 ({this.state['p1'].health})</button>
        <button onClick={this.attack} disabled={this.state.turn !== 'p2'}>Player 2 ({this.state['p2'].health})</button>
      </div>
    )
  }
}

export default App
