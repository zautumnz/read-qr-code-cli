#!/usr/bin/env node

const jsqr = require('jsqr')
const jimp = require('jimp')
const { execFile } = require('child_process')

const usage = () => {
  console.error(`Usage:
# prints the decoded url
read-qr-code-cli some-file.png
# opens link in your browser
read-qr-code-cli -o some-file.png
# shorthand name
readqr some-file.png`)
  process.exit(1)
}

const openUrl = (args) => {
  const as = [args]
  const cmd =
    process.platform === 'win32'
      ? 'cmd'
      : process.platform === 'darwin'
        ? 'open'
        : 'xdg-open'
  return execFile(cmd, as, {}, () => {})
}

const formatData = ({ data, height, width }) => ({
  imageData: new Uint8ClampedArray(data),
  height,
  width
})

const handleArgs = () => {
  const args = process.argv.slice(2)
  if (args.length === 1) {
    return { file: args[0] }
  }

  if (args.length === 2) {
    if (args.find((a) => a === '-o')) {
      return { file: args.find((a) => a !== '-o'), open: true }
    }
  }

  return usage()
}

const main = () => {
  const { file, open } = handleArgs()
  jimp.read(file)
    .then(({ bitmap }) => formatData(bitmap))
    .then(({ imageData, width, height }) => {
      return jsqr(imageData, width, height)
    })
    .then((info) => {
      const url = info.data || info?.chunks?.[0]?.text
      console.log(url)
      if (open) {
        openUrl(url)
      }
    })
    .catch((err) => {
      console.error('Error reading qr code', err)
    })
}

if (require.main === module) {
  main()
}
