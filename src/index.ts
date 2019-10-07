#! /usr/bin/env node
import { join as pathJoin, isAbsolute } from 'path'
import { readdirSync, existsSync, writeFileSync } from 'fs'
import { isDirectory, getProjectRootPath } from './services/fsService'
import * as Log from './utils/logger'
import { resolveImport, mergeProtos, getProtoContent } from './utils/proto'
import { parseArgv } from './utils/argvParser'

const args = parseArgv()

if (args.path && args.out) {
  const path = isAbsolute(args.path) ? args.path : pathJoin(getProjectRootPath(), args.path)
  const out = isAbsolute(args.out) ? args.out : pathJoin(getProjectRootPath(), args.out)
  const domains = readdirSync(path)
  
  domains.forEach(domain => {
    const pathToProto = pathJoin(path, domain, `${domain}-api`)
    if (existsSync(pathToProto)) {
      Log.info(`Domain: ${domain}`)

      const toMerge = []
      readdirSync(pathToProto).forEach(element => {
        if (!isDirectory(pathJoin(pathToProto, element))) {
          const servicePath = pathJoin(pathToProto, element)
          const protoService = getProtoContent(servicePath)

          const importStatements = protoService.match(/import ".*";/g) || []
          importStatements.forEach(importStatement => {
            const protoImported = resolveImport(pathToProto, importStatement)

            const mergedProto = protoService.replace(importStatement, protoImported)
            toMerge.push(mergedProto)
          })
        }
      })
      if (toMerge.length > 1) {
        const protoMerged = mergeProtos(toMerge)

        const protoPath = pathJoin(out, `${domain}.proto`)
        writeFileSync(protoPath, protoMerged)
        Log.success('', 'Successfully merged')
      }
    }
  })
} else {
  Log.error('', 'Invalid command')
  Log.info('Usage: protomerge --path path/to/domain --out path/to/output')
}
