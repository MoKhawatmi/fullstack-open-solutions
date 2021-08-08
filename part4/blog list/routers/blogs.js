let express = require('express');
let router = express.Router();
let Blog = require('../models/blog');
let User = require("../models/user");
let { extractUser } = require("../middleware/authMiddleware");


router.get('/', (request, response) => {
    Blog
        .find()
        .then(blogs => {
            response.json(blogs)
        })
})

router.put('/like', (req, res) => {
    let blogId=req.body.blogId;
    Blog.findById(blogId).then(blog=>{
        if(blog){
            blog.likes+=1;
            new Blog(blog).save().then(response=>{
                res.status(200).json(response);
            }).catch(err=>{
                res.status(400).send(err)    
            })
        }else{
            res.status(400).send("no blog")
        }
    })
})

router.delete('/:id',(req,res)=>{
    Blog.findByIdAndDelete(req.params.id).then(response=>{
        Blog.find().then(blogs=>{
            res.status(200).json(blogs);
        })
    }).catch(err=>{
        res.status(400).send(err);
    });
})

router.post('/', extractUser, (req, res) => {
    console.log("user doing the action", req.user);
    if (res.locals.userToken) {
        User.findById(res.locals.userToken.userId).then(user => {
            let blog = req.body;
            blog.author = user.userName;
            new Blog(blog).save().then(result => {
                res.status(201).json(result);
            }).catch(err => {
                res.status(401).send(err);
            })
        }).catch(err => {
            res.status(402).send(err);
        });
    } else {
        res.status(400).send("user not logged in");
    }
})

router.delete('/:title', extractUser, (req, res) => {
    console.log("user doing the action", req.user);
    let title = req.params.title;
    if (res.locals.userToken) {
        Blog.findOne({ title: title }).then(blog => {
            if (blog) {
                User.findById(res.locals.userToken.userId).then(user => {
                    if (user) {
                        if (user.userName == blog.author) {
                            Blog.findOneAndDelete({ title: title }).then(result => {
                                res.status(200).send("deleted");
                            }).catch(err => {
                                res.status(400).send(err);
                            });
                        }
                        else {
                            res.status(400).send("action not allowed");
                        }
                    } else {
                        res.status(400).send("action not allowed");
                    }
                })
            } else {
                res.status(400).send("no such blog");
            }
        })
    } else {
        res.status(400).send("action not allowed");
    }
})

module.exports = router;
