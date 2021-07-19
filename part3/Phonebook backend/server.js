let morgan = require('morgan');
let express = require("express");
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors');
let app = express();

let Entry = require("./models/entery")

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6y5yz.mongodb.net/db1?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("listening");
    });
}).catch(err => {
    console.log(err);
})



app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

app.get("/api/persons", (req, res) => {
    Entry.find().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
})

app.get("/api/persons/:id", (req, res, next) => {
    Entry.findById(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send(`<p>User not found</p>`);
        }
    }).catch(err=>{next(err)})
});

app.post("/api/persons", (req, res) => {
    let newPerson = req.body;
    console.log(req.body);
    Entry.find().then(result => {
        if (result.find(person => person.name == newPerson.name)) {
            return res.status(400).send(`<p>Person already exists</p>`);
        } else if (!newPerson.name || !newPerson.number) {
            return res.status(400).send(`<p>Missing name or number</p>`);
        } else {
            newPerson.id = Math.random() * 10;
            newPerson.show = true;
            let entry=new Entry(newPerson)
            entry.save().then(result=>{
                res.status(202).json(newPerson);
            }).catch(err=>{
                res.status(400).send(err.message);
            })
        }
    })
})

app.put("/api/persons/:id", (req, res) => {
    Entry.find().then(result => {
        let newPerson = req.body;
        let updatePerson=new Entry(newPerson);
        Entry.findByIdAndUpdate(req.params.id,updatePerson).then(result=>{
            res.status(202).json(newPerson);
        })
    })
})

app.delete("/api/persons/:id", (req, res) => {
    Entry.find().then(result => {
        console.log(result);
        let person = result.find(person => person._id == req.params.id);
        if (person) {
            Entry.findByIdAndDelete(person._id).then(result2=>{
                res.status(202).json(result.filter(person => person._id != req.params.id));
            })
        } else {
            res.status(404).send(`<p>User not found</p>`);
        }
    })

});

app.get("/info", (req, res) => {
    Entry.find().then(result => {
        res.status(200).send(`<p>Phonebook has info for ${result.length} people <br/> ${new Date()}</p>`);
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
app.use(errorHandler)
