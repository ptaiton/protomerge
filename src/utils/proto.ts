import { join as pathJoin, sep as pathSeparator } from 'path'
import { readFileSync } from 'fs'

export interface IProtoInfos {
  syntax?: string
  package?: string
  javaPackage?: string
}

export const cleanProto = (protoContent: string) => {
  return protoContent
  .replace(/^syntax = .*;/gm, '')
  .replace(/^package .*;/gm, '')
  .replace(/^option java_package = .*;/gm, '')
  .replace(/\n\n*/g, '\n')
}

export const getProtoInfos = (protoContent: string): IProtoInfos => {
  const syntaxMatched = protoContent.match(/^syntax = .*;/gm)
  const packageMatched = protoContent.match(/^package .*;/gm)
  const javaPackageMatched = protoContent.match(/^option java_package = .*;/gm)

  return {
    syntax: syntaxMatched ? syntaxMatched[0] : null,
    package: packageMatched ? packageMatched[0] : null,
    javaPackage: javaPackageMatched ? javaPackageMatched[0] : null,
  }
}

export const resolveImport = (protoPath: string, importStatement: string) => {
  const importPath = importStatement.match(/"(.*)"/).slice(-1)[0]
  const importFullPath = pathJoin(protoPath, ...importPath.split(pathSeparator))

  return cleanProto(getProtoContent(importFullPath))
}

export const mergeProtos = (proto: IProtoInfos, protos: string[]) => {
  const baseProto = Object.values(proto)
    .filter(v => v)
    .reduce((acc, v) => `${acc}${v}\n`, '')
  return protos.reduce((finalProto, proto) => finalProto + proto, baseProto)
}

export const getProtoContent = (path: string) => {
  return readFileSync(path).toString()
}