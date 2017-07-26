import React, {Component} from 'react'
import itemData from '../items'

class Player extends Component {
  render () {
    const {id, playerData: {weapon, health, turn}, onClick} = this.props
    return (
      <div style={{width: '50%', display: 'inline-block'}}>
        <p>Player {id} - {weapon} ({health})</p>
        <button
          onClick={turn ? onClick : null}
          disabled={!turn}>
          {itemData[weapon].move}
        </button>
      </div>
    )
  }
}

export default Player
