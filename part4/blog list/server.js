require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

let {checkUserToken} = require("./middleware/authMiddleware");

let blogsRouter = require('./routers/blogs');
let usersRouter = require('./routers/users');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const PORT = 3000;

const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.6y5yz.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('*', checkUserToken);

app.use('/api/blogs', blogsRouter);
app.use('/api/user', usersRouter);



