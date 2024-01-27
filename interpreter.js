import fs from 'node:fs'
import { argv } from 'node:process'

const fileName = argv[2]
const fileWrite = []

fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const lines = data.split('\n')
  lines.forEach(val => {
    if(val.includes('meow')) {
      console.log(val)
    }
  })
})