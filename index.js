#!/usr/bin/env node

const jsqr = require('jsqr')
const jimp = require('jimp')

const usage = () => {
  console.error(`Usage:
read-qr-code-cli some-file.png`)
  process.exit(1)
}

const formatData = ({ data, height, width }) => ({
  imageData: new Uint8ClampedArray(data),
  height,
  width
})

const main = () => {
  if (!process.argv[2]) {
    usage()
  } else {
    jimp.read(process.argv[2])
      .then(({ bitmap }) => formatData(bitmap))
      .then(({ imageData, width, height }) => {
        return jsqr(imageData, width, height)
      })
      .then((info) => {
        console.log(info.data || info?.chunks?.[0]?.text)
      })
      .catch((err) => {
        console.error('Error reading qr code', err)
      })
  }
}

if (!module.parent) {
  main()
}
