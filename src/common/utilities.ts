import { BoardSettings, Flag, Player, PlayerStats, WordInfoDict } from './constants'

/**
 *  Returns a string color code
 */
export const flagColor = (flag: Flag): string => {
  switch (flag) {
    case Flag.Unknown:
      return 'grey'
    case Flag.Missing:
      return 'grey'
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

// not in use
export const AppendConnectionStateMessageList = (message: string) => {
  const messageInput = document.getElementById('messageInput')
  if (messageInput) (messageInput as HTMLFormElement).disabled = true

  const li = document.createElement('li')
  li.textContent = message

  const messageList = document.getElementById('messageList')
  if (messageInput) (messageList as HTMLFormElement).appendChild(li)
}

export const checkForMissingAttributes = (attributes: object) => {
  const attributesMap = Object.entries(attributes)
  attributesMap.forEach(([attribute, value]) => {
    if (value === undefined) {
      throw new Error('Missing ' + attribute)
    }
  })
}

export const createEmptyBoard = (boardSettings: BoardSettings) => {
  const x = boardSettings.letters.length
  const y = boardSettings.categories.length
  const gameBoard = [...Array(x)].map(() => [...Array(y)].map(() => ''))

  return gameBoard
}

/**
 * Calculates player score by checking the flag for each answer
 */
export const calculatePlayerStats = (
  player: Player,
  boardSettings: BoardSettings,
  dictionary: WordInfoDict[][]
): PlayerStats => {
  const { letters, categories } = boardSettings

  const playerStats: PlayerStats = {
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
        playerStats.missing += 1
        return
      case Flag.Wrong:
        playerStats.wrong += 1
        return
      case Flag.Common:
        playerStats.common += 1
        return
      case Flag.Unique:
        playerStats.unique += 1
        return
      default:
        playerStats.unknown += 1
        return
    }
  }

  for (let l = 0; l < letters.length; l++) {
    for (let c = 0; c < categories.length; c++) {
      const word = player.board[l][c].toLowerCase()
      addScore(dictionary[l][c][word].flag)
    }
  }

  playerStats.correct = playerStats.common + playerStats.unique
  // Each unique answer is worth 2 points
  playerStats.score = playerStats.common + playerStats.unique * 2

  return playerStats
}
