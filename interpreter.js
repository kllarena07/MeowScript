import fs from 'node:fs'
import { argv } from 'node:process'
import { createConstVar, createLetVar, toJSFile } from './core/builder.js'

const fileName = argv[2]

function convertStringToCode(input) {
  // Split input string into lines
  const lines = input.split('\n').map(line => line.trim());

  let variableDeclarations = '';
  let functionDefinition = '';

  // Process each line
  for (const line of lines) {
      // Check if the line matches variable declaration pattern
      const functionDefinitionRegex = /^murmur\s+(\w+)\s*{$/i;
      const functionMatch = line.match(functionDefinitionRegex);
      const variableDeclarationRegex = /^meow\s+(\w+)\s+(.+)$/i;
      const variableMatch = line.match(variableDeclarationRegex);

      if(functionMatch) {
        const [, functionName] = functionMatch;
        functionDefinition += `function ${functionName}() {\n`;
      } else if (line.trim() === '}') {
        functionDefinition += '}\n';
      } else if (functionDefinition) {
        functionDefinition += `  ${line.trim()}\n`;
      } else if (variableMatch) {
        const [, variableName, variableValue] = variableMatch;
        variableDeclarations += `let ${variableName} = ${variableValue}\n`;
      }
  }

  // Combine variable declarations and function definition
  const code = `${variableDeclarations}\n${functionDefinition}`;

  return code;
}

const writeBuffer = []
fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(data.split('\n'))
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