/**
 * Types
 */
export type Player = {
  name: string
  id: number
  userId: number
  color: string
  score: number
  board: Board
}

export type Board = string[][]

export type GameRoom = {
  roomId: string
  roomName: string
  timeLimit: number
  boardSettings: BoardSettings
}

export type BoardSettings = {
  letters: string[]
  categories: string[]
}

export type WordInfo = { frequency: number }

export type WordFrequencies = { [word: string]: WordInfo }

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
  elapsedTime: -99,
}
