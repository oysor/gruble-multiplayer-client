import { BoardSettings, GameRoom, IncomingGameRoom, Player } from '../constants'

/**
 *  For checking the incomings from server.
 *
 */
export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export function isNumber(x: unknown): x is number {
  return typeof x === 'number'
}

export function isStringArray(array: unknown): array is string[] {
  return array instanceof Array && typeof array[0] === 'string'
}

export function is2DStringArray(array: unknown): array is string[][] {
  return (
    array instanceof Array && array[0] instanceof Array && typeof array[0][0] === 'string'
  )
}

export function is2DArray(array: unknown): array is unknown[][] {
  return array instanceof Array && array[0] instanceof Array
}

export function isArray(array: unknown): array is unknown[] {
  return array instanceof Array
}

export function isUndefined(x: unknown): x is undefined {
  return typeof x === 'undefined'
}
