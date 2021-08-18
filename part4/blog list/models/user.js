const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator');
let Blog=require('./blog');

const userSchema = new mongoose.Schema({
  userName: {type:String, unique:true},
  password: String,
  name: String,
  blogs: [Blog.schema]
},{ collection: 'users' })

userSchema.plugin(uniqueValidator);
const User = mongoose.model('users', userSchema)

module.exports=User;