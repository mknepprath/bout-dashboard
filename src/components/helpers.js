import itemData from '../items'

/**
 * Creates initial player data for each player
 **/
 const initPlayerData = (players) => {
   let nextState = {}
   players.forEach((player, i) => {
     nextState[player] = {
       health: 12,
       weapon: getWeapon(),
       turn: !i // true only for player 1
     }
   })
   return nextState
 }

/**
 * Returns a random item
 **/
const getWeapon = () => {
  const items = Object.keys(itemData)
  return items[Math.floor(Math.random() * (items.length))]
}

export {initPlayerData, getWeapon}
