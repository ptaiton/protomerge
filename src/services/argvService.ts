interface IArgs {
  path?: string
  out?: string
}

const parseArgv = (): IArgs => {
  const argv = process.argv.slice(2)

  let lastKey = ''
  return argv.reduce((acc, arg) => {
    if (arg.startsWith('-')) {
      const key = arg.replace(/^-+/, '')
      lastKey = key
      acc[key] = ''
    } else {
      acc[lastKey] = arg
    }

    return acc
  }, {})
}