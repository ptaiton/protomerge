interface IArgs {
  path?: string
  out?: string
}

export const parseArgv = (): IArgs => {
  const argv = process.argv

  console.log(argv)
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