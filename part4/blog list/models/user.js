const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  userName: {type:String, unique:true},
  password: String,
  name: String,
},{ collection: 'users' })

userSchema.plugin(uniqueValidator);
const User = mongoose.model('users', userSchema)

module.exports=User;