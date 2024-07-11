const mongoose = require ('mongoose');


const UserSchema = new mongoose.Schema({
  name: String,
  title:String,
  description: String,
  image: String
      
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
