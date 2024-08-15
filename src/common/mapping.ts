import { IncomingPlayer, Player } from './constants'

export const mapPlayerFromAPI = (APIplayer: IncomingPlayer): Player => {
  const { board, color, name, signalRUserId, playerResult, hasSubmittedBoard } = APIplayer

  const appPlayer: Player = {
    board: board,
    color: color,
    name: name,
    userId: signalRUserId,
    playerResult: playerResult,
    hasSubmitted: hasSubmittedBoard
  }
  return appPlayer
}
