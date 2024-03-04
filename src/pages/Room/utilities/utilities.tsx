import {
  BoardSettings,
  Flag,
  Player,
  PlayerResult,
  WordInfoDict,
  WordInfo,
} from '../../../common/constants'
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
/**
 * Calculates player score by checking the flag for each answer
 */
const calculatePlayerScore = (
  player: Player,
  boardSettings: BoardSettings,
  dictionary: WordInfoDict[][]
): PlayerResult => {
  const { letters, categories } = boardSettings

  const playerResult: PlayerResult = {
    score: 0,
    correct: 0,
    unique: 0,
    common: 0,
    wrong: 0,
    missing: 0,
    unknown: 0,
  }

  const addScore = (flag: Flag) => {
    switch (flag) {
      case Flag.Missing:
        playerResult.missing += 1
        return
      case Flag.Wrong:
        playerResult.wrong += 1
        return
      case Flag.Common:
        playerResult.common += 1
        return
      case Flag.Unique:
        playerResult.unique += 1
        return
      default:
        playerResult.unknown += 1
        return
    }
  }

  for (let l = 0; l < letters.length; l++) {
    for (let c = 0; c < categories.length; c++) {
      const word = player.board[l][c].toLowerCase()
      addScore(dictionary[l][c][word].flag)
    }
  }

  playerResult.correct = playerResult.common + playerResult.unique
  // Each unique answer is worth 2 points
  playerResult.score = playerResult.common + playerResult.unique * 2

  return playerResult
}
/**
 *  Calculate results and update playerResults for each player
 */
export const updatePlayerListResults = (
  playerList: Player[],
  boardSettings: BoardSettings,
  dictionary: WordInfoDict[][]
): Player[] => {
  return [...playerList].map((player) => {
    const updatedPlayer = { ...player }
    updatedPlayer.playerResult = calculatePlayerScore(player, boardSettings, dictionary)
    return updatedPlayer
  })
}
