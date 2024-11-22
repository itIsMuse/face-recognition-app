import fs from 'fs'

const brackets = fs.readFileSync('./new.md')

const stringed =  brackets.toString()


const bracketsToArray = stringed.split("")
console.log(bracketsToArray.length)

// const countLevel = bracketsToArray.reduce((acc, symbol, index) => {

//     if(symbol === ')'){
//         acc -= 1
//         // console.log(acc)
//     } else if (symbol === '('){
//         acc += 1

//     }
//     console.log(`Index: ${index - 5984}, Symbol: ${symbol}, Accumulator: ${acc}`)
//     return acc
// }, 0)

// console.log(countLevel)

let balance = 0; // To track the cumulative balance
let firstNegativeIndex = -1;

// Step-by-step process
bracketsToArray.filter((symbol, index) => {
  if (symbol === '(') {
    balance += 1;
  } else if (symbol === ')') {
    balance -= 1;
  }

  // Check if balance is -1 for the first time
  if (balance === -1 && firstNegativeIndex === -1) {
    firstNegativeIndex = index;
  }

  console.log(`Index: ${index}, Symbol: ${symbol}, Balance: ${balance}`);
});

// Log the first occurrence of -1
if (firstNegativeIndex !== -1) {
  console.log(`First reaches -1 at index: ${firstNegativeIndex}`);
} else {
  console.log(`Never reaches -1`);
}

// use other laptop to try this code 