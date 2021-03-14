import { BoardSettings, Player } from '../../common/constants'

export const test_boardSettings: BoardSettings = {
  categories: ['Mat', 'Lukt', 'Skog'],
  letters: ['A', 'B', 'D'],
}

const player1: Player = {
  name: 'Ole',
  board: [
    ['ananas', 'Anal', 'Agnebøk'],
    ['Banan', 'Bæsj', 'Bjørk'],
    ['Dadler', 'Drenering', 'Dovendyr'],
  ],
  color: '',
  id: 0,
  userId: 0,
  score: 0,
  scoreBoard: [],
  playerResult: {
    score: 0,
    correct: 0,
    unique: 0,
    common: 0,
    wrong: 0,
    missing: 0,
    unknown: 0,
  },
}
const player2: Player = {
  name: 'Bernt',
  board: [
    ['Ananas', 'Anal', 'Alm'],
    ['Bolle', 'Bunnavfall', 'Busk'],
    ['Drops', 'Dass', 'Dådyr'],
  ],
  color: '',
  id: 0,
  userId: 0,
  score: 0,
  scoreBoard: [],
  playerResult: {
    score: 0,
    correct: 0,
    unique: 0,
    common: 0,
    wrong: 0,
    missing: 0,
    unknown: 0,
  },
}
const player3: Player = {
  name: 'Carl',
  board: [
    ['Aprikos', 'Avfall', 'Skog'],
    ['Brus', 'Bæsj', 'Busk'],
    ['Dadler', 'Do', 'Dvergbjørk'],
  ],
  color: '',
  id: 0,
  userId: 0,
  score: 0,
  scoreBoard: [],
  playerResult: {
    score: 0,
    correct: 0,
    unique: 0,
    common: 0,
    wrong: 0,
    missing: 0,
    unknown: 0,
  },
}

export const test_playerList = [player1, player2, player3]
