import { BoardSettings, ScoreBoard } from '../../common/constants'

export const test_boardSettings: BoardSettings = {
  categories: ['Mat', 'Lukt', 'Skog'],
  letters: ['A', 'B', 'D'],
}

type Player = {
  name: string
  board: string[][]
  color: string
  id: number
  userId: number
  score: number
  scoreBoard: ScoreBoard
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
}

export const test_playerList = [player1, player2, player3]
