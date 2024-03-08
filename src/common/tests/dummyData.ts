import { createWordInfoDict } from '../../Room/utilities'
import {
  Board,
  BoardSettings,
  ConnectionMode,
  Flag,
  Player,
  ScoreBoard,
  initPlayerResult,
} from '../constants'

export const dummyBoardSettings: BoardSettings = {
  categories: ['Spiselig', 'Land', 'Fugler'],
  letters: ['A', 'B', 'C'],
}

export const dummyAnswers: Board = [
  ['Aananas', 'Armenia', 'Ape'],
  ['Banan', 'Bulgaria', 'Bavian'],
  ['Cyklops', 'Canada', 'Canarifugl'],
]

export const dummyScoreBoard: ScoreBoard = [
  [
    { flag: Flag.Unique, word: 'Aananas' },
    { flag: Flag.Unique, word: 'Armenia' },
    { flag: Flag.Unique, word: 'Ape' },
  ],
  [
    { flag: Flag.Unique, word: 'Banan' },
    { flag: Flag.Unique, word: 'Bulgaria' },
    { flag: Flag.Unique, word: 'Bavian' },
  ],
  [
    { flag: Flag.Unique, word: 'Cyklops' },
    { flag: Flag.Unique, word: 'Canada' },
    { flag: Flag.Unique, word: 'Canarifugl' },
  ],
]

export const dummyPlayerList: Player[] = [
  {
    name: 'Bjarne',
    id: 111,
    userId: 1,
    color: 'red',
    board: dummyAnswers,
    scoreBoard: dummyScoreBoard,
    playerResult: initPlayerResult,
  },
]

export const dummyCommonStates = {
  playerCount: 0,
  status: ConnectionMode.Connecting,
  elapsedTime: -99,
}

export const dummyDictionary = () =>
  createWordInfoDict(dummyPlayerList, dummyBoardSettings)
