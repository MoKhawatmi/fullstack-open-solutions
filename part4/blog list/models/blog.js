const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  blogID: String,
  likes: Number,
  comments: [String]
},{ collection: 'blogs' })

const Blog = mongoose.model('blogs', blogSchema)

module.exports=Blog;
