import { join as pathJoin, sep as pathSeparator } from 'path'
import { readFileSync } from 'fs'

export const cleanProto = (proto: string) => {
  return proto
    .replace(/syntax = .*/, '')
    .replace('\n\n', '')
}

export const resolveImport = (protoPath: string, importStatement: string) => {
  const importPath = importStatement.match(/"(.*)"/).slice(-1)[0]
  const importFullPath = pathJoin(protoPath, ...importPath.split(pathSeparator))

  return getProtoContent(importFullPath)
}

export const mergeProtos = (protos: string[]) => {
  const baseProto = 'syntax = "proto3";\n'
  return protos.reduce((finalProto, proto) => finalProto + proto, baseProto)
}

export const getProtoContent = (path: string) => {
  return cleanProto(readFileSync(path).toString())
}