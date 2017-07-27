import React, {Component} from 'react'
import Player from './Player'
import itemData from '../items'
import {initPlayerData} from './helpers'
import styled from 'styled-components'

const BoutContainer = styled.div`
  margin: 10px;
  border: 1px solid #222;
  border-radius: 5px;
`
const BoutHeader = styled.div`
  color: #FFF;
  padding: 10px;
  background: #222;
`

class Bout extends Component {
  constructor (props) {
    super(props)

    // Attack calc
    this.attack = () => {
      const {players} = this.props.boutData

      // Init next state
      let nextState = {}

      // Update health and turn for each player
      players.forEach((player, i) => {
        const {turn, health, weapon} = this.state[player]

        // Init damage
        let damage = 0
        let _health = health

        // If not your turn, you're being attacked... calc damage
        if (!turn) {
          const {minDamage: min, maxDamage: max, accuracy} = itemData[weapon]
          if (Math.random() <= accuracy) {
            damage = Math.floor(Math.random() * (max - min + 1)) + min
            _health = Math.max(health - damage, 0)
          }
        }

        // Apply damage to health, switch turn
        nextState[player] = {
          ...this.state[player],
          health: _health,
          turn: !turn
        }
        if (!_health) nextState.status = 'done'
      })
      this.setState(nextState)
    }

    // TODO: Put the following in a helper
    const {players} = this.props.boutData
    this.state = initPlayerData(players)
  }
  componentWillReceiveProps(nextProps) {
    const {boutData} = nextProps
    if (this.props.boutData !== boutData) {
      this.setState(initPlayerData(boutData.players))
    }
  }
  render () {
    const {boutData: {id, players}} = this.props
    const {status} = this.state
    return (
      <BoutContainer>
        <BoutHeader>{id + (status ? ' (game over)' : '')}</BoutHeader>
        <div style={{padding: 10}}>
          {players.map((player, i) => {
            return (
              <Player
                key={i}
                id={player}
                active={!status && this.state[player].turn}
                playerData={this.state[player]}
                onClick={!status ? this.attack : null} />
              )
          })}
        </div>
      </BoutContainer>
    )
  }
}

export default Bout
