import { IncomingPlayer, Player } from './constants'

export const mapPlayerFromAPI = (APIplayer: IncomingPlayer): Player => {
  const { board, color, name, id, signalRUserId, playerResult } = APIplayer

  const appPlayer: Player = {
    board: board,
    color: color,
    name: name,
    id: id,
    userId: signalRUserId,
    playerResult: playerResult,
  }
  return appPlayer
}
