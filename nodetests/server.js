import express from 'express'

const app = express()
// const user = {
//     'name' : 'Museya',
//     'attitude': 'chill'
// }

    app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('helooo')
})

app.get('/profile', (req, res) => {
console.log(req.query)
res.send('hello, world')
})

app.post('/profile', (req, res) => {
    console.log(req.body)
    res.send('sucess')
    })

app.listen(4000)