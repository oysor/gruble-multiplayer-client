import { Flag } from './constants'

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
    console.log(attribute)
    if (value === undefined) {
      throw new Error('Missing ' + attribute)
    }
  })
}