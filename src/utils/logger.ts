import { LogColors } from '../types/LogColors'


export const info = (message: string): void => {
  console.log(message)
}

export const error = (pre = '', message: string, post = ''): void => {
  console.log(pre, LogColors.FG_RED, message, post)
}

export const success = (pre = '', message: string, post = ''): void => {
  console.log(pre, LogColors.FG_GREEN, message, post)
}
