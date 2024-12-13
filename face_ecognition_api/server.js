import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'oluwalonmuseya',
      password: '1Temito',
      database: 'smart_brain',
    },
  });

  db.select("*").from("login").then(data => {
    console.log(data)
  })

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
    db.select('*').from('users').where({id}).then(user => {
        if(user.length){
            res.send(user[0])
        }else{
            res.status(404).send('no such user') 
        }
    }
    )
        
    }
    )
 

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
    db('users')
    .returning('*')
    .insert({
        name: name ,
        email: email,
        date_joined: new Date
    }).then(user => res.json(user[0])).catch(
        err => res.status(400).json('unable to register')
    )
})

app.put('/image', (req, res) => {
    const {id} = req.body
    db('users')
    .where('id', '=', id)
    .increment('entries', 1) // Increment the 'entries' column by 1 in the database
    .returning('entries') // Return the updated 'entries' value
    .then(entries => {
        console.log(entries) // Send 404 if no user is found
        })
    })
app.listen(4500, (err) => {
    console.log(err)
})

// today was quite different than yesterday but the deed is done thanks be to God i completeed what i wanted , i have been shown how to update entries 