import { boardSettings, gameRoom, Player } from '../constants'

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
  return array instanceof Array && typeof array[0][0] === 'string'
}

export function isUndefined(x: unknown): x is undefined {
  return typeof x === 'undefined'
}

export function isBoardSettings(object: boardSettings): object is boardSettings {
  const { letters, categories } = object

  if (!isStringArray(letters)) {
    throw new Error(`---> Expected letters to be string[], got '${letters}'. <---`)
  }
  if (!isStringArray(categories)) {
    throw new Error(`---> Expected categories to be string[], got '${categories}'. <---`)
  }

  return isStringArray(letters) && isStringArray(categories)
}

export function checkOnRoom(object: gameRoom): object is gameRoom {
  const { roomId, lobbyName, timeLimit, boardSettings } = object

  if (!isString(roomId)) {
    throw new Error(`---> Expected roomId to be string, got '${roomId}'. <---`)
  }
  if (!isString(lobbyName)) {
    throw new Error(`---> Expected lobbyName to be string, got '${lobbyName}'. <---`)
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

export function checkOnPlayer(object: Player): object is Player {
  const { playerName, playerId, color, score } = object

  if (!isString(playerName)) {
    throw new Error(`---> Expected playerName to be string, got '${playerName}'. <---`)
  }
  if (!isNumber(playerId)) {
    throw new Error(`---> Expected playerId to be number, got '${playerId}'. <---`)
  }
  if (!isString(color)) {
    throw new Error(`---> Expected color to be string, got '${color}'. <---`)
  }
  if (!isNumber(score)) {
    throw new Error(`---> Expected score to be number, got '${score}'. <---`)
  }
  return true
}
