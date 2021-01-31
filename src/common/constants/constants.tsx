/**
 * Types
 */
export type Player = {
  playerName: string
  playerId: number
  color: string
  score: number
}

export type Board = string[][]

export type gameRoom = {
  roomId: string
  lobbyName: string
  timeLimit: number
  boardSettings: boardSettings
}

export type boardSettings = {
  letters: string[]
  categories: string[]
}

export type CommonStates = {
  playerCount: number
  status: ConnectionMode
  elapsedTime: number
}

/**
 * Enums
 */
export enum LoadingMode {
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Idle = 'IDLE',
}

/**
 * Enum containing all possible connection status types.
 */
export enum ConnectionMode {
  Connecting = 'CONNECTING',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  Reconnecting = 'RECONNECTING',
  Failed = 'FAILED',
}

/**
 * Init states
 */
export const initialCommonStates: CommonStates = {
  playerCount: 0,
  status: ConnectionMode.Connecting,
  elapsedTime: 0,
}
