import { Player, APIPlayer } from './constants'
import { checkForMissingAttributes } from './utilities'

export const mapPlayerFromAPI = (player: APIPlayer): Player => {
  const { board, color, name, signalRUserId, hasSubmittedBoard } = player

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
    userId: signalRUserId,
    name: name,
    color: color,
    board: board,
    hasSubmitted: hasSubmittedBoard,
    playerResult: emptyStats,
  }

  checkForMissingAttributes(newObject)

  return newObject
}

export const mapPlayerToAPI = (player: Player): APIPlayer => {
  const { board, color, name, userId, hasSubmitted } = player

  const newObject: APIPlayer = {
    signalRUserId: userId,
    name: name,
    color: color,
    board: board,
    hasSubmittedBoard: hasSubmitted,
  }

  checkForMissingAttributes(newObject)

  return newObject
}
