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
  board: Board
  scoreBoard: ScoreBoard
  playerResult: PlayerResult
}
export type Message = {
  player: Player
  message: string
}

export type PlayerResult = {
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

export type WordInfoDict = { [word: string]: WordInfo }

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

export const initPlayerResult: PlayerResult = {
  score: 0,
  correct: 0,
  unique: 0,
  common: 0,
  wrong: 0,
  missing: 0,
  unknown: 0,
}

export const API_URL = process.env.API_URL ? process.env.API_URL : 'API URL MISSING?'
