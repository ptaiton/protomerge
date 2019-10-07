import { lstatSync } from "fs"

export const isDirectory = (path: string) => {
  return lstatSync(path).isDirectory()
}