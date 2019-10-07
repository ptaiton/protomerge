import { lstatSync, readdirSync } from "fs"
import { join } from "path"

interface IFilePath {
  fileName: string
  path: string
}

const findPatternToRegex = (findPattern: string) => {
  const formattedPattern = findPattern
    .replace('.', '\.')
    .replace('*', '.*')
  
  return new RegExp(formattedPattern, 'g')
}

export const isDirectory = (path: string) => {
  return lstatSync(path).isDirectory()
}

export const findInPath = (path: string, findPattern: string) => {
  const filesPaths: IFilePath[] = []
  const findInDirectory = (directoryPath: string) => {
    const elements = readdirSync(directoryPath)
    elements.forEach(element => {
      const elementPath = join(directoryPath, element)
      if(lstatSync(element).isDirectory()) {
        findInDirectory(elementPath)
      } else {
        if(element.match(findPatternToRegex(findPattern))) {
          filesPaths.push({ fileName: element, path: elementPath })
        }
      }
    })
  }

  findInDirectory(path)
  return filesPaths
}