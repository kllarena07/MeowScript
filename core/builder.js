import fs from 'node:fs'

export const toJSFile = (buffer) => {
  const fileContent = buffer.join('\n');

  fs.writeFileSync("main.js", fileContent);

  console.log("File successfully interpreted");
}

export const createLetVar = (val) => {
  const split = val.split(' ')
  const variableLine = "let " + split[0] + " = " + split[2]
  return variableLine
}

export const createConstVar = (val) => {
  const split = val.split(' ')
  const variableLine = "const " + split[0] + " = " + split[2]
  return variableLine
}