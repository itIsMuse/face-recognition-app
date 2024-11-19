import fs from 'fs'

fs.readFile('./hello.txt', (err, data) =>{
    if(err){
        console.log('There is an error')
    }
    console.log(data)
})