import fs from 'node:fs'
import { argv } from 'node:process'
import { createConstVar, createLetVar, toJSFile } from './core/builder.js'

const fileName = argv[2]

const writeBuffer = []
fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const funcRegex = /murmur\s+(\w+)\s*{([\s\S]*?)}/g
  console.log(data)
  // toJSFile(writeBuffer)
})
// const lines = data.split('\n')
// lines.forEach(val => {
//   if(val.includes('meow')) {
//     const bufferVal = createLetVar(val)
//     writeBuffer.push(bufferVal)
//   }
//   if(val.includes('MEOW')) {
//     const bufferVal = createConstVar(val)
//     writeBuffer.push(bufferVal)
//   }
//   if(val.includes("murmur")) {

//   }
// })