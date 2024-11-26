import express from 'express'

const app = express()
app.use(express.json())

const database = {
    users:[
    {'id' : '123',
    'name': 'museya',
    'email': 'oyeniranshock@gmail.com',
    'password': '1Temitope',
    'entries': 0,
    'Date-joined': new Date
},
{
    'id' : '124',
    'name': 'museya1',
    'email': 'oyeniranshock@gmail1.com',
    'password': '1Temitope1',
    'entries': 0,
    'Date-joined': new Date
}]}

app.get('/', (req, res)=> {
    res.send('this is working')
})


app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
       return  res.json('success')
    }else {
       return  res.status(400).json('error logging')
    }
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body
    database.users.push(
            {'id' : '123',
                'name': name,
                'email': email,
                'password': password,
                'entries': 0,
                'Date-joined': new Date
        }
    )
    res.send (database)
})

app.listen(4500, () => {
    console.log(database.users)
})

//