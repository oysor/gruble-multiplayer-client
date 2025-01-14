import {
  BoardSettings,
  Flag,
  Player,
  WordInfoDict,
  WordInfo,
  Board,
} from '../common/constants'
/**
 *  This function goes through every players board
 *  and adds the input word (key) and its frequency (word count) to a dictionary.
 */
export function createBoardDictionary(
  players: Player[],
  boardSettings: BoardSettings
): WordInfoDict[][] {
  const { categories, letters } = boardSettings

  const boardDictionary: WordInfoDict[][] = emptyBoardDictionary(letters, categories)

  for (let l = 0; l < letters.length; l++) {
    for (let c = 0; c < categories.length; c++) {
      const dictionary: { [word: string]: WordInfo } = {}

      players.forEach((player) => {
        const word = player.board[l][c].toLowerCase()
        const frequency = word in dictionary ? dictionary[word].frequency + 1 : 1
        const flag = newFlag(word, letters[l], frequency)
        dictionary[word] = { frequency: frequency, flag: flag, word: word }
      })
      boardDictionary[l][c] = dictionary
    }
  }

  return boardDictionary
}

const newFlag = (word: string, letter: string, frequency: number) => {
  // empty space
  if (word === '') {
    return Flag.Missing
    // Check if first letter is correct
  } else if (letter.toLowerCase() !== word[0]) {
    return Flag.Wrong
    // Common word
  } else if (frequency > 1) {
    return Flag.Common
    // Unique word
  } else if (frequency === 1) {
    return Flag.Unique
  }
  return Flag.Unknown
}
/**
 *  Creates an empty scoreBoard
 */
const emptyBoardDictionary = (letters: string[], categories: string[]) => {
  return [...Array(letters.length)].map(() =>
    [...Array(categories.length)].map(() => {
      return {}
    })
  )
}

export const addPlayerSubmitToList = (
  players: Player[],
  userId: string,
  board: Board
) => {
  return players.map((p) => {
    if (p.userId === userId && p.hasSubmitted == false) {
      p.board = board
      p.hasSubmitted = true
    }
    return p
  })
}

export const allBoardsReceived = (playerList: Player[]) => {
  const numberOfPlayers = playerList.length
  const receivedBoards = playerList.filter((p) => p.hasSubmitted === true).length

  return numberOfPlayers === receivedBoards
}
