import fs from 'node:fs'
import { argv } from 'node:process'

const fileName = argv[2]

const toJSFile = (buffer) => {
  const fileContent = buffer.join('\n');

  fs.writeFileSync("main.js", fileContent);

  console.log("File successfully interpreted");
}

const writeBuffer = []
fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const converted_lines = data.split('\n')
  
  for (let line of converted_lines) {
    if (line.includes('meow')) {
      var temp = line.split(' ')
      line = line.replace('meow', 'let')
    } 
    if (line.includes('MEOW')) {
      line = line.replace('MEOW', 'const')
    }
    if (line.includes('hiss')) {
       line = line.replace('hiss', 'console.log')
    } 
    if (line.includes('murmur')) {
       line = line.replace('murmur', 'function')
    } 
    if (line.includes('^._.^')){
      line = line.replaceAll('^._.^', 'for')
    }
    if (line.includes('^+^') || line.includes('^-^') || line.includes('^*^') || line.includes('^/^') || line.includes('^%^') || line.includes('^=^')
    ){
      line = line.replaceAll('^', '')
    }
    if (line.includes)
      writeBuffer.push(line)
  }
  toJSFile(writeBuffer)
})
