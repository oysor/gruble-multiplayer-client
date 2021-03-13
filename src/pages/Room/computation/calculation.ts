import {
  Board,
  BoardSettings,
  Flag,
  Player,
  ScoreBoard,
  ScoreCard,
  WordFrequencies,
  WordInfo,
} from '../../../common/constants'
/**
 *  This function goes through every players board
 *  and adds the input word (key) and its frequency (value) to a dictionary.
 */
export function calculateWordFrequencies(
  players: Player[],
  boardSettings: BoardSettings
): WordFrequencies {
  const { categories, letters } = boardSettings
  const frequencyList: { [word: string]: WordInfo } = {}

  for (let l = 0; l < letters.length; l++) {
    for (let c = 0; c < categories.length; c++) {
      players.forEach((player) => {
        const word = player.board[l][c].toLowerCase()
        frequencyList[word] = !(word in frequencyList)
          ? { frequency: 1 }
          : { frequency: frequencyList[word].frequency + 1 }
      })
    }
  }

  return frequencyList
}

/**
 *  Each square inside the scoreBoard contains a scoreCard.
 *  This scoreCard contains the input word and a flag that can be used to determine the score.
 */
export const newScoreCard = (
  inputWord: string,
  letter: string,
  freqList: WordFrequencies
): ScoreCard => {
  const word = inputWord.toLowerCase()
  const card: ScoreCard = { flag: Flag.Unknown, word: word }
  const wordFrequency = freqList[word].frequency

  // empty space
  if (word === '') {
    card.flag = Flag.Missing
    // Check if first letter is correct
  } else if (letter.toLowerCase() !== word[0]) {
    card.flag = Flag.Wrong
    // Common word
  } else if (wordFrequency > 1) {
    card.flag = Flag.Common
    // Unique word
  } else if (wordFrequency === 1) {
    card.flag = Flag.Unique
  }
  return card
}

/**
 *  Creates an empty scoreBoard
 */
const emptyScoreBoard = (letters: string[], categories: string[]) => {
  return [...Array(letters.length)].map(() =>
    [...Array(categories.length)].map(() => {
      return { flag: Flag.Unknown, word: '' }
    })
  )
}
/**
 *  Fills in a scoreCard for each input square
 */
const fillScoreBoard = (
  board: Board,
  freqList: WordFrequencies,
  boardSettings: BoardSettings
): ScoreBoard => {
  const { categories, letters } = boardSettings
  const scoreBoard: ScoreBoard = emptyScoreBoard(letters, categories)

  letters.forEach((letter, l) => {
    categories.forEach((category, c) => {
      const word = board[l][c]
      const card = newScoreCard(word, letter, freqList)
      scoreBoard[l][c] = card
    })
  })
  return scoreBoard
}
/**
 *  Updates the scoreBoard for every player
 */
export const updatePlayerScores = (
  playerList: Player[],
  boardSettings: BoardSettings,
  freqList: WordFrequencies
): Player[] => {
  return playerList.map((player) => {
    player.scoreBoard = fillScoreBoard(player.board, freqList, boardSettings)
    return player
  })
}
/**
 *  Returns a string color code
 */
export const flagColor = (flag: Flag): string => {
  switch (flag) {
    case Flag.Unknown:
      return 'grey'
    case Flag.Missing:
      return 'white'
    case Flag.Wrong:
      return 'red'
    case Flag.Common:
      return 'green'
    case Flag.Unique:
      return 'purple'
  }
}
