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

  const converted_lines = data.replaceAll('{', "\n<FUNC_BEGIN>").replaceAll('}', "<FUNC_END>").split('\n')
  
  for (let line of converted_lines) {
    if (line.includes('meow')) {
      const broken = line.split(' ')
      writeBuffer.push(`let ${broken[1]} = ${broken[2]}`)
    } else if (line.includes('MEOW')) {
      const broken = line.split(' ')
      writeBuffer.push(`const ${broken[1]} = ${broken[2]}`)
    } else if (line.includes('hiss')) {
      const modified = line.replace('hiss', 'console.log')
      writeBuffer.push(modified)
    } else if (line.includes('murmur')) {
      const broken = line.split(' ')
      writeBuffer.push(`function ${broken[1]}()`)
    } else if (line.includes('<FUNC_BEGIN>')) {
      writeBuffer.push('{')
    } else if (line.includes('<FUNC_END>')) {
      const broken = line.split(':')
      writeBuffer.push(`}\n${broken[1].trim()}()`)
    }
  }
  toJSFile(writeBuffer)
})
