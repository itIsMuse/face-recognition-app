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



const app = express()
app.use(express.json())
app.use(cors())




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
 


app.post('/signin', (req, res) => {
    const { email, password } = req.body;
  
    db.select('email', 'password_hash')
      .from('login')
      .where('email', '=', email)
      .then(user => {
        if (user.length) { // Check if the user exists
          const isValid = bcrypt.compareSync(password, user[0].password_hash);
          if (isValid) {
            return db
              .select('*')
              .from('users')
              .where('email', '=', email)
              .then(user => res.json(user[0]))
              .catch(err => res.status(400).json('unable to get user'));
          } else {
            // Wrong password
            res.status(400).json('wrong credentials');
          }
        } else {
          // Email not found
          res.status(400).json('wrong credentials');
        }
      })
      .catch(err => res.status(400).json('error logging in'));
  });
  


app.post('/register', (req, res) => {
    const {name, email, password} = req.body
    const password_hash = bcrypt.hashSync(password)
    
    db.transaction(trx => {
        trx.insert({
           email: email,
            password_hash : password_hash
        }).into('login').
        returning('email').then(
            loginEmail =>
                trx('users')
                .returning('*')
                .insert({
                    name: name ,
                    email: loginEmail[0].email,
                    date_joined: new Date
                }).then(user => res.json(user[0])).catch(
                    err => res.status(400).json('unable to register')
        )
        ).then(trx.commit).catch(trx.rollback).then(trx.commit).catch(trx.rollback)
    })
})

app.put('/image', (req, res) => {
    const {id} = req.body
    db('users')
    .where('id', '=', id)
    .increment('entries', 1) // Increment the 'entries' column by 1 in the database
    .returning('entries') // Return the updated 'entries' value
    .then(entries => {
        res.json(entries[0]) // Send 404 if no user is found
        }).catch(err => console.log (err))
    })


app.listen(4500, (err) => {
    console.log(err)
})

//need to continue tomorrow the whole refactoring 