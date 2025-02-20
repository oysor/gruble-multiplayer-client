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
  userId: string
  color: string
  board: Board
  hasSubmitted: boolean
  playerResult: PlayerStats
  isDisconnected: boolean
  dropOut: boolean
}

export type Message = {
  player: Player
  message: string
}

export type MessageItem = {
  color: string | undefined
  name: string | undefined
  message: string
}

export type PlayerStats = {
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

export enum GameStatus {
  GameCreated = 0,
  RoundStarted = 1,
  RoundEnded = 2,
  ResultsReceived = 3,
}

export enum PlayerPage {
  lobby = 1,
  play = 2,
  results = 3,
}

export enum RoomStatus {
  roundCreated = 0,
  roundReady = 1,
  roundStarted = 2,
  roundEnded = 3,
  boardsReceived = 4,
  dispatchedResults = 5,
}

export enum RoomPage {
  lobby = 1,
  play = 2,
  answers = 3,
  results = 4,
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

export const initPlayerResult: PlayerStats = {
  score: 0,
  correct: 0,
  unique: 0,
  common: 0,
  wrong: 0,
  missing: 0,
  unknown: 0,
}

export const API_URL = process.env.API_URL ? process.env.API_URL : 'API URL MISSING?'

export enum TimerSettings {
  LitteTime = 5,
  PlentyTime = 10,
}

// object from API

export type IncomingGameRoom = {
  roomMasterId: string
  signalRGroupName: string
  roomName: string
  timeLimit: number
  boardSettings: BoardSettings
  players: APIPlayer[]
  gameStatus: GameStatus
}

export type APIPlayer = {
  name: string
  signalRUserId: string
  hasSubmittedBoard: boolean
  color: string
  board: Board
}

export type RemovePlayer = {
  userId: string
}

export type IncomingUserId = {
  userId: string
}

export type IncomingDisconnctedPlayer = {
  userId: string
  disconnected: boolean
}

export type IncomingMessage = {
  id: string
  message: string
}

export type IncomingElapsedTime = {
  elapsedTime: number
}

export type IncomingPlayerBoard = {
  userId: string
  board: Board
}

export type SquareCoords = {
  letter: number
  category: number
}

export type DispatchResults = {
  playerList: Player[]
  boardDictionary: WordInfoDict[][]
}

export type IncomingResults = {
  players: APIPlayer[]
  boardDictionary: WordInfoDict[][]
}

export type UpdateDictionary = {
  square: SquareCoords
  word: string
  flag: Flag
}

export type TimeLimit = { timeLimit: number }

export type UpdateBoardSettings = {
  letters: string[]
  categories: string[]
  timeLimi?: number
}

export type UpdateTimeLimit = {
  timeLimit: number
}

export type IncomingPlayerRoom = {
  room: IncomingGameRoom
  userId: string
}

export type JoinRoom = {
  roomId: string
  playerName: string
}
export type SendMessage = {
  roomId: string
  message: string
}
