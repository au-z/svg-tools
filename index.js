#! /usr/bin/env node
require('./src/polyfills.js')
const args = require('yargs').argv._
const svg = require('./src/SvgTools')

const docs =
`======================================
SVG TOOLS:
  - (s)prite: create a sprite sheet from the provided svgs
    arguments:
      1. the relative directory path
      2. the absolute output file path

  - (p)rint: print an svg
    arguments:
      1. the relative svg file path
    flags:
      2. h | H: print as HTML
======================================`

try {
  validate(args)
  switch(args[0]) {
    case 's':
    case 'sprite': return svg.spriteSheet(args[1])
      .then((sheet) => svg.save(sheet, args[2]))

    case 'p':
    case 'print': return svg.load(args[1])
      .then((svg) => {
        const data = (!args[2] || args[2].toUpperCase() !== 'H') ? svg : svg.toHtmlString()
        console.log(data)
      })

    default: return console.log(docs)
  }
} catch(ex) {
  console.error(`[svg-tools] ${ex.message}`)
}

function validate(args) {
  switch(args[0]) {
    case 'sprite': {
      if(!args[1] || !args[2]) throw new Error('Must provide a directory and full output file path.')
    }
    case 'print': {
      if(!args[1]) throw new Error('Must provide a relative path to the file.')
    }
  }
}
