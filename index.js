const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const UserModel = require('./models/Users')
const RegisterModel = require('./models/Register')
// const LoginModel = require('./models/Login')

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

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     RegisterModel.findOne({email: email})
//     .then(user => {
//         if(user) {
//             res.json("Already have an account")
//         } else {
//             RegisterModel.create({name: name, email: email, password: password})
//             .then(result => res.json(result))
//             .catch(err => res.json(err))
//         }
//     }).catch(err => res.json(err))
// })

app.post('/', (req, res) => {
        RegisterModel.create(req.body)
        .then(register => res.json(register))
        .catch(err => res.json(err))
    })

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            } else{
                res.json("password incorrect")
            }
            
        } else {
            res.json("No record existed")
        }
    }).catch(err => res.json(err))
})

app.get('/userss', (req, res) => {
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
        age: req.body.age
       })
     .then(users => res.json(users))
     .catch(err => res.json(err))
 })

// app.put('/updateUser/:id', (req, res) => {
//     const id = req.params.id;
//      UserModel.findByIdAndUpdate({_id: id},
//      {  name: req.body.name,
//         title: req.body.title,
//         description: req.body.description
//        })
//      .then(users => res.json(users))
//      .catch(err => res.json(err))
//  })

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

