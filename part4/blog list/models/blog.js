const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  blogID: String,
  likes: Number
},{ collection: 'blogs' })

const Blog = mongoose.model('blogs', blogSchema)

module.exports=Blog;