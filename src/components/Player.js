import React, {Component} from 'react'
import itemData from '../items'

class Player extends Component {
  render () {
    const {id, active, playerData: {weapon, health}, onClick} = this.props
    return (
      <div style={{width: '50%', display: 'inline-block'}}>
        <p>Player {id} - {weapon} ({health ? health : 'lost'})</p>
        <button
          onClick={onClick}
          disabled={!active}>
          {itemData[weapon].move}
        </button>
      </div>
    )
  }
}

export default Player
