import { BoardSettings, GameRoom, IncomingGameRoom, Player } from '../constants'

/**
 *  For checking the incomings from server.
 *
 */
export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export function isNumber(x: unknown): x is number {
  return typeof x === 'number'
}

export function isStringArray(array: unknown): array is string[] {
  return array instanceof Array && typeof array[0] === 'string'
}

export function is2DStringArray(array: unknown): array is string[][] {
  return (
    array instanceof Array && array[0] instanceof Array && typeof array[0][0] === 'string'
  )
}

export function is2DArray(array: unknown): array is unknown[][] {
  return array instanceof Array && array[0] instanceof Array
}

export function isArray(array: unknown): array is unknown[] {
  return array instanceof Array
}

export function isUndefined(x: unknown): x is undefined {
  return typeof x === 'undefined'
}

export function isBoardSettings(object: BoardSettings): object is BoardSettings {
  const { letters, categories } = object

  if (!isStringArray(letters)) {
    throw new Error(`---> Expected letters to be string[], got '${letters}'. <---`)
  }
  if (!isStringArray(categories)) {
    throw new Error(`---> Expected categories to be string[], got '${categories}'. <---`)
  }

  return isStringArray(letters) && isStringArray(categories)
}

export function checkOnRoom(object: IncomingGameRoom): object is IncomingGameRoom {
  if (object === null) {
    return false
  }

  const { signalRGroupName, roomName, timeLimit, boardSettings } = object

  if (!isString(signalRGroupName)) {
    throw new Error(
      `---> Expected signalRGroupName to be string, got '${signalRGroupName}'. <---`
    )
  }
  if (!isString(roomName)) {
    throw new Error(`---> Expected roomName to be string, got '${roomName}'. <---`)
  }
  if (!isNumber(timeLimit)) {
    throw new Error(`---> Expected timeLimit to be number, got '${timeLimit}'. <---`)
  }

  isBoardSettings(boardSettings)

  return true
}

export function checkOnReceiveMessage(msg: unknown): msg is string {
  if (!isString(msg)) {
    throw new Error(`---> Expected message to be string, got '${msg}'. <---`)
  }
  return true
}

export function checkOnTimerElapsed(timeElapsed: unknown): timeElapsed is number {
  if (!isNumber(timeElapsed)) {
    throw new Error(`---> Expected timeElapsed to be number, got '${timeElapsed}'. <---`)
  }
  return true
}

export function checkOnNewPlayer(object: Player): object is Player {
  const { id, userId, name, color } = object

  if (!isNumber(id)) {
    throw new Error(`---> Expected player id to be number, got '${id}'. <---`)
  }
  if (!isString(userId)) {
    throw new Error(`---> Expected userId to be string, got '${userId}'. <---`)
  }
  if (!isString(name)) {
    throw new Error(`---> Expected player name to be string, got '${name}'. <---`)
  }
  if (!isString(color)) {
    throw new Error(`---> Expected color to be string, got '${color}'. <---`)
  }
  return true
}

export function checkOnPlayerResult(object: Player): object is Player {
  const { id, userId, name, color, board } = object

  // if (!isNumber(id)) {
  //   throw new Error(`---> Expected player id to be number, got '${id}'. <---`)
  // }
  if (!isString(userId)) {
    throw new Error(`---> Expected userId to be string, got '${userId}'. <---`)
  }
  if (!isString(name)) {
    throw new Error(`---> Expected player name to be string, got '${name}'. <---`)
  }
  if (!isString(color)) {
    throw new Error(`---> Expected color to be string, got '${color}'. <---`)
  }
  if (!is2DStringArray(board)) {
    throw new Error(
      `---> Expected player board to be at least Array, got '${board}'. <---`
    )
  }
  return true
}

export function checkPlayerList(playerList: Player[]): playerList is Player[] {
  return isArray(playerList) && checkOnPlayerResult(playerList[0])
}
