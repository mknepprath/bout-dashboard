import React, {Component} from 'react'
import Player from './Player'
import itemData from '../items'
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
    this.attack = () => {
      // Figure out whose turn it is
      const {p1, p2} = this.props.boutData
      const {turn: p1Turn} = this.state[p1]
      const turn = p1Turn ? p1 : p2
      const nextTurn = p1Turn ? p2 : p1
      const {weapon} = this.state[turn]
      const {minDamage: min, maxDamage: max, accuracy} = itemData[weapon]
      let playerState = {...this.state[turn]}
      let nextPlayerState = {...this.state[nextTurn]}

      // If attack hits, update health of other player
      if (Math.random() <= accuracy) {
        const damage = Math.floor(Math.random() * (max - min + 1)) + min
        nextPlayerState.health = Math.max(nextPlayerState.health - damage, 0)
      }

      // Update whose turn it is
      nextPlayerState.turn = true
      playerState.turn = false

      // Update state
      this.setState({
        ...this.state,
        [turn]: playerState,
        [nextTurn]: nextPlayerState
      })
    }
    this.getWeapon = () => {
      // Returns a random item
      const items = Object.keys(itemData)
      return items[Math.floor(Math.random() * (items.length))]
    }
    this.state = {
      [this.props.boutData.p1]: {
        health: 12,
        weapon: this.getWeapon(),
        turn: true
      },
      [this.props.boutData.p2]: {
        health: 12,
        weapon: this.getWeapon(),
        turn: false
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const {boutData, boutData: {p1, p2}} = nextProps
    if (this.props.boutData !== boutData) {
      this.setState({
        [p1]: {
          health: 12,
          weapon: this.getWeapon(),
          turn: true
        },
        [p2]: {
          health: 12,
          weapon: this.getWeapon(),
          turn: false
        }
      })
    }
  }
  render () {
    const {boutData: {id, p1, p2}} = this.props
    return (
      <BoutContainer>
        <BoutHeader>{id}</BoutHeader>
        <div style={{padding: 10}}>
          <Player
            id={p1}
            playerData={this.state[p1]}
            onClick={this.attack} />
          <Player
            id={p2}
            playerData={this.state[p2]}
            onClick={this.attack} />
        </div>
      </BoutContainer>
    )
  }
}

export default Bout
