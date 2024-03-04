import { Flag } from './constants'

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
