import React, {Component} from 'react'
import Bout from './components/Bout'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {bouts: []}
    this.addBout = () => {
      // Create dummy bout id
      const playerId = this.state.bouts.length * 2
      const nextBout = {
        id: 'bout-' + playerId + '-' + (playerId + 1),
        players: [
          playerId,
          playerId + 1
        ]
      }

      // Add new bout id to bouts in state
      let nextBouts = [...this.state.bouts]
      nextBouts.push(nextBout)

      // Update state
      this.setState({...this.state, bouts: nextBouts})
    }
  }
  render () {
    const {bouts} = this.state
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to Bout</h2>
        </div>
        <p className='App-intro'>
          Time to battle!
        </p>
        {bouts.map((boutData, i) => {
          return (
            <Bout
              key={i}
              boutData={boutData} />
          )
        })}
        <button onClick={this.addBout} style={{marginBottom: 10}}>New Bout</button>
      </div>
    )
  }
}

export default App
