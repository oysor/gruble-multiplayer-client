import {
  Board,
  BoardSettings,
  Flag,
  Player,
  PlayerResult,
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
/**
 *  Set flag based on word frequency
 */
export const getFlag = (freq: number): Flag => {
  if (freq === 1) {
    return Flag.Unique
  } else if (freq > 1) {
    return Flag.Common
  } else {
    return Flag.Unknown
  }
}
/**
 * Calculates player score by checking the flag for each answer
 */
export const calculatePlayerScore = (
  player: Player,
  boardSettings: BoardSettings
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
      addScore(player.scoreBoard[l][c].flag)
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
  boardSettings: BoardSettings
): Player[] => {
  return [...playerList].map((player) => {
    const updatedPlayer = { ...player }
    updatedPlayer.playerResult = calculatePlayerScore(player, boardSettings)
    return updatedPlayer
  })
}
