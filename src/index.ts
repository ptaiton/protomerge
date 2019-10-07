#! /usr/bin/env node
import { join as pathJoin } from 'path'
import { readdirSync, existsSync, writeFileSync } from 'fs'
import { isDirectory } from './services/fsService'
import * as Log from './utils/logger'
import { resolveImport, mergeProtos, getProtoContent } from './utils/proto'
import { parseArgv } from './utils/argvParser'

const args = parseArgv()

if (args.path && args.out) {
  const domains = readdirSync(args.path)
  
  domains.forEach(domain => {
    const pathToProto = pathJoin(args.path, domain, `${domain}-api`)
    if (existsSync(pathToProto)) {
      Log.info(`Domain: ${domain}`)

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
        Log.success('', 'Successfully merged')
      }
    }
  })
} else {
  Log.error('', 'Invalid command')
  Log.info('Usage: protomerge --path path/to/domain --out path/to/output')
}
