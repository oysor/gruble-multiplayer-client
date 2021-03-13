/**
 * Types
 */

export type CommonStates = {
  playerCount: number
  status: ConnectionMode
  elapsedTime: number
}

export type Player = {
  name: string
  id: number
  userId: number
  color: string
  score: number
  board: Board
  scoreBoard: ScoreBoard
}

export type PlayerResults = {
  score: number
  correct: number
  unique: number
  common: number
  wrong: number
  missing: number
  unknown: number
}

export type Board = string[][]

export type ScoreCard = {
  flag: Flag
  word: string
}

export type ScoreBoard = ScoreCard[][]

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

/**
 * Enums
 */
export enum LoadingMode {
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Idle = 'IDLE',
}

export enum Flag {
  Unknown = 'UNKNOWN',
  Missing = 'MISSING',
  Wrong = 'WRONG',
  Common = 'COMMON',
  Unique = 'UNIQUE',
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
