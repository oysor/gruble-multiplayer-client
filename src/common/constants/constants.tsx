/**
 * Types
 */

export type CommonStates = {
  playerCount: number
  status: ConnectionMode
  elapsedTime: number
  roundIsOn: boolean
}

export type Player = {
  name: string
  id: string
  userId: string
  color: string
  board: Board
  hasSubmitted: boolean
  // scoreBoard: ScoreBoard
  playerResult: PlayerResult
}

export type IncomingPlayer = {
  name: string
  id: string
  signalRUserId: string
  hasSubmittedBoard: boolean
  color: string
  board: Board
  score: 0
  // scoreBoard: ScoreBoard
  playerResult: PlayerResult
}

export type Message = {
  player: Player
  message: string
}

export type IncomingMessage = {
  id: string
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

// export type ScoreBoard = string[][]

export type GameRoom = {
  roomId: string
  roomName: string
  timeLimit: number
  boardSettings: BoardSettings
}

export type IncomingGameRoom = {
  signalRGroupName: string
  roomName: string
  timeLimit: number
  boardSettings: BoardSettings
}

export type BoardSettings = {
  letters: string[]
  categories: string[]
}

export type WordInfo = { frequency: number; flag: Flag; word: string }

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
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
  Reconnecting = 'Reconnecting',
  Disconnecting = 'Disconnecting',
  Failed = 'FAILED',
}

/**
 * Init states
 */
export const initialCommonStates: CommonStates = {
  playerCount: 0,
  status: ConnectionMode.Disconnected,
  elapsedTime: -99,
  roundIsOn: false,
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
