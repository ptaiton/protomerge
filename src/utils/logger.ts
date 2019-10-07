import { LogColors } from '../types/LogColors'

const toColor = (message: string, color: string) => color + message + LogColors.RESET

export const info = (message: string): void => {
  console.log(message)
}

export const error = (pre = '', message: string, post = ''): void => {
  console.log(pre, toColor(message, LogColors.FG_RED), post)
}

export const success = (pre = '', message: string, post = ''): void => {
  console.log(pre, toColor(message, LogColors.FG_GREEN), post)
}
