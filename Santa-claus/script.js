import fs from 'fs'

function question1(){
  fs.readFile('./hello.txt', (err, data) => {
    const direction = data.toString()
    const directionToArray = direction.split('')
    const answer = directionToArray.reduce((acc, symbol) => {
      if(symbol === '('){
        return acc += 1
      } else if (symbol === ')'){
        return acc -= 1
      } return acc
    }, 0)
    console.log(answer)
  })
}

question1()