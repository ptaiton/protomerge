#! /usr/bin/env node
import { join as pathJoin } from 'path'
import { readdirSync, existsSync, writeFileSync } from 'fs'
import { isDirectory } from './services/fsService'
import { resolveImport, mergeProtos, getProtoContent } from './services/protoModifierService'

const args = parseArgv()
if (!args.path && !args.out) {
  console.log('Invalid command')
}

const domains = readdirSync(args.path)
domains.forEach(domain => {
  const pathToProto = pathJoin(args.path, domain, `${domain}-api`)
  if (existsSync(pathToProto)) {
    const toMerge = []
    readdirSync(pathToProto).forEach(element => {
      if (!isDirectory(pathJoin(pathToProto, element))) {
        const servicePath = pathJoin(pathToProto, element)
        const protoService = getProtoContent(servicePath)

        const importStatements = protoService.match(/import ".*";/g) || []
        importStatements.forEach(importStatement => {
          const protoImported = resolveImport(args.path, importStatement)

          const mergedProto = protoService.replace(importStatement, protoImported)
          toMerge.push(mergedProto)
        })
      }
    })
    if (toMerge.length > 1) {
      const protoMerged = mergeProtos(toMerge)

      const out = pathJoin(args.out, `${domain}.proto`)
      writeFileSync(out, protoMerged)
    }
  }
})

console.log('finished')