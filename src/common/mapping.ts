import { IncomingPlayer, Player } from './constants'
import { checkForMissingAttributes } from './utilities'

export const mapPlayerFromAPI = (player: IncomingPlayer): Player => {
  const { board, color, name, signalRUserId, hasSubmittedBoard } = player

  // Mapping players before the game has started.
  const emptyStats = {
    score: 0,
    correct: 0,
    unique: 0,
    common: 0,
    wrong: 0,
    missing: 0,
    unknown: 0,
  }

  const newObject: Player = {
    board: board,
    color: color,
    name: name,
    userId: signalRUserId,
    playerResult: emptyStats,
    hasSubmitted: hasSubmittedBoard,
  }
  checkForMissingAttributes(newObject)

  return newObject
}
