const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    // name: String,
    // email: String,
    // password: String
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
})

const RegisterModel = mongoose.model("register", RegisterSchema);
module.exports = RegisterModel;