import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const database = {
    users:[
    {'id' : 123,
    'name': 'museya',
    'email': 'oyeniranshock@gmail.com',
    'password': '1Temitope',
    'entries': 0,
    'Date-joined': new Date
},
{
    'id' : 124,
    'name': 'museya1',
    'email': 'oyeniranshock@gmail1.com',
    'password': '1Temitope1',
    'entries': 0,
    'Date-joined': new Date
}]}

app.get('/', (req, res)=> {
    res.send(database)
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params
    database.users.forEach(item =>{
        let found = false 
        if(item.id === id){
            found = true
            return res.json(item)
        }
        if(!found){
            return res.status(404).send('No such user')
        }
    }
    )
 
})

// app.post('/signin', (req, res) => {

//     const {email, password} = req.body
//     database.users.find(user => {
//     if(email === user.email && password === user.password){
//        return  res.json('success')
//     }else {
//        return  res.status(400).json('error logging')
//     }
// })})


app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const user = database.users.find(user => user.email === email && user.password === password);
    if (user) {
        return res.json(user)

    } else {
        return res.status(400).json('error logging in');
    }
});


app.post('/register', (req, res) => {
    const {name, email, password} = req.body

    const lastUser = database.users[database.users.length - 1]; // Get the last user object
    const newId = lastUser ? lastUser.id + 1 : 1; // If there's no user, start at 1

   
    database.users.push(
            {'id' : newId,
                'name': name,
                'email': email,
                'password': password,
                'entries': 0,
                'Date-joined': new Date
        }
    )
    res.send (database.users[database.users.length - 1])
})

app.post('/image', (req, res) => {
    const {id} = req.body
    database.users.forEach(user =>{
        let found = false 
        if(user.id === id){
            found = true
            user.entries ++
         return res.json(user.entries)
        }
        if(!found){
         res.status(404).send('No such user')
        }
    }
    )

})

app.listen(4500, (err) => {
    console.log(err)
})