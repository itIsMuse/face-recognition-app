import fs from 'fs'

const rawFile = fs.readFileSync('./hello.txt')

const stringed = rawFile.toString()

const arrayed = stringed.split('')

const counter = arrayed.reduce((acc, symbol, index) => {
  if(symbol === '('){
    symbol = '40'
    acc += 1

  } else if (symbol === ')'){
    symbol = '41'
    acc -= 1
    
  }
  console.log(`Step ${index}: Symbol: ${symbol}, Accumulator: ${acc}`);
  return acc
}, 0)

console.log(counter)