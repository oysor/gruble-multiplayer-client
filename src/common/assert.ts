import { IncomingGameRoom } from './constants'
import { checkForMissingAttributes } from './utilities'

export function assertIsRoom(room: IncomingGameRoom) {
  const { roomMasterId, signalRGroupName, roomName, timeLimit, boardSettings } = room

  const newObject: IncomingGameRoom = {
    roomMasterId: roomMasterId,
    signalRGroupName: signalRGroupName,
    roomName: roomName,
    timeLimit: timeLimit,
    boardSettings: boardSettings,
  }
  checkForMissingAttributes(newObject)
}
