const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
dotenv.config();
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT || 5000))
  .then(() => console.log("Connected to database😊"))
  .catch((err) => console.log(err));

// app.get('/getUsers', (req,res) => {
//     UserModel.find()
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
   const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
     UserModel.findByIdAndUpdate({_id: id},
     {  name: req.body.name,
        email: req.body.email,
        age: req.body.age    })
     .then(users => res.json(users))
     .catch(err => res.json(err))
 })

 app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
     UserModel.findByIdAndDelete({_id: id})
     .then(res => res.json(res))
     .catch(err => res.json(err))
 })

app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/', function (request, response)
 { 
    response.send('Hello World ✨🎉✨')
 }); 

