import fs from 'node:fs'
import { argv } from 'node:process'

const fileName = argv[2]

const toJSFile = (buffer) => {
  const fileContent = buffer.join('\n');

  fs.writeFileSync("main.js", fileContent);
}

const writeBuffer = []

fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const converted_lines = data.replaceAll('{', "\n<BLOCK_BEGIN>")
                              .replaceAll('}', "<BLOCK_END>")
                              .replaceAll(':3', '<')
                              .replaceAll('!:3', '>')
                              .replaceAll(':>', '>=')
                              .replaceAll('!:>', '<=')
                              .replaceAll('^%^', '%')
                              .replaceAll('^+^', '+')
                              .replaceAll('^-^', '-')
                              .replaceAll('^*^', '*')
                              .replaceAll('^/^', '/')
                              .split('\n')

  for (let line of converted_lines) {
    if(line.includes('NAP')) {
      writeBuffer.push(line.replace('NAP', '//'))
    }
    if (line.includes('meow')) {
      const broken = line.split(' ')
      writeBuffer.push(`let ${broken[1]} = ${broken[2]}`)
    }
    if (line.includes('MEOW')) {
      const broken = line.split(' ')
      writeBuffer.push(`const ${broken[1]} = ${broken[2]}`)
    }
    if (line.includes('hiss')) {
      const modified = line.replace('hiss', 'console.log')
      writeBuffer.push(modified)
    }
    if (line.includes('murmur')) {
      const broken = line.split('murmur')
      writeBuffer.push(`function ${broken[1].trim()}()`)
    }
    if (line.includes('<BLOCK_BEGIN>')) {
      writeBuffer.push(`{`)
    }
    if (line.includes('<BLOCK_END>')) {
      writeBuffer.push(`}`)
    }
    if (line.includes('pet->')) {
      const broken = line.split('->')
      writeBuffer.push(`${broken[1]}()`)
    }
    if (line.includes('^o_o^')) {
      const broken = line.split(' ')
      writeBuffer.push(`while (${broken[1]} ${broken[2]} ${broken[3]})`)
    }
    if (line.includes('^.+.^')) {
      writeBuffer.push(line.replace('^.+.^', '+='))
    }
    if (line.includes('^.-.^')) {
      writeBuffer.push(line.replace('^.-.^', '-='))
    }
    if (line.includes('^.*.^')) {
      writeBuffer.push(line.replace('^.*.^', '*='))
    }
    if (line.includes('^./.^')) {
      writeBuffer.push(line.replace('^./.^', '/='))
    }
  }
  toJSFile(writeBuffer)
})
