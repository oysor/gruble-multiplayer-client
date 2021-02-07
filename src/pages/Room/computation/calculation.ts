import {
  BoardSettings,
  Player,
  WordFrequencies,
  WordInfo,
} from '../../../common/constants'

export function calculateWordFrequencies(
  players: Player[],
  boardSettings: BoardSettings
): WordFrequencies {
  const { categories, letters } = boardSettings
  const frequencyList: { [word: string]: WordInfo } = {}

  for (let l = 0; l < letters.length; l++) {
    for (let c = 0; c < categories.length; c++) {
      players.forEach((player) => {
        const word = player.board[l][c]
        frequencyList[word] = !(word in frequencyList)
          ? { frequency: 1 }
          : { frequency: frequencyList[word].frequency + 1 }
      })
    }
  }

  return frequencyList
}
