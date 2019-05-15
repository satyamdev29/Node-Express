///////////////////////////////////////////////////////////////
// Require Packages need to include / Add
///////////////////////////////////////////////////////////////

const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port = 3000

app.use(express.json()) // to data as json format

///////////////////////////////////////////////////////////////
// Configure Mongoose & Establish a DB Connection with MongoDB
///////////////////////////////////////////////////////////////

// confgure mongoose to use global promises
mongoose.Promise = global.Promise

// Establish a database connection
mongoose.connect('mongodb://localhost:27017/my-apps', { useNewUrlParser: true })
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(err){
        console.log('error: connecting to db')
    })

///////////////////////////////////////////////////////////////
// Creating Mongoose Schema
///////////////////////////////////////////////////////////////

const Schema = mongoose.Schema // es6- Object destructuring // const { Schema } = mongoose

// telling a document what fields it should have , like what properties and object should have
const noteSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    },
    createdate:{
        type: Date,
        required: true,
        default: Date.now
    },
    updatedate:{
        type: Date,
        required: true,
        default: Date.now
    },
    tage:{
        type: Array,
        required: true
    }
})
// model based on the schema - a model will become our object constructor function
// model names must be singular and must follow PascalCase
const Note = mongoose.model('Contact', noteSchema)

// in DB there will be a collection called as notes

///////////////////////////////////////////////////////////////
// Setup routers
///////////////////////////////////////////////////////////////

// localhost:3000/notes
// Get the list of all notes
app.get('/notes', function(req, res){
    Note.find()
        .then(function(notes){
            res.send(notes)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/notes
// To save/add the notes
app.post('/notes', function(req, res){
    const body = req.body // es6 { body } = req
    const note = new Note(body)
    note.save()
        .then(function(note){
            res.send(note)
        })
        .catch(function(err){
            res.send(err)
        })
    })

//localhost:3000/notes/:id
// To get single notes
app.get('/notes/:id', function(req, res){
    const id = req.params.id
    Note.findById(id)
        .then(function(note){
            res.send(note)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/notes/:id
// To find single record and delete.
app.delete('/notes/:id', function (req, res){
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then(function(note){
            // When you are trying to find record by id, if the record is not found, it returns null, not be understood as promise being rejected
            if(note){
                res.send({
                    note,
                    notice:"Sucessfully removed"
                    })
        } else {
                res.status('404').send({})
        }
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/notes/:id
// To find record and update.
app.put('/notes/:id', function(req, res){
    const id = req.params.id
    const body = req.body // es6 { body } = req.body
    Note.findByIdAndUpdate(id, body, { new : true, runValidators: true})
        .then(function(note){
            if(note){
                res.send({
                    note,
                    notice: "Successfully updated.."
                })
            } else {
                res.status(404).send({})
            }
        })
        .catch(function (err){
            res.send(err)
        })
})

app.listen(port,function(){
    console.log(`Listening port ${port}`)
})