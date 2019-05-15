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
const contactSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }
})

// model based on the schema - a model will become our object constructor function
// model names must be singular and must follow PascalCase
const Contact = mongoose.model('Contact', contactSchema)

// in DB there will be a collection called as contacts

///////////////////////////////////////////////////////////////
// Setup routers
///////////////////////////////////////////////////////////////

// localhost:3000/contacts
// Get the list of all contacts
app.get('/contacts', function(req, res){
    Contact.find()
        .then(function(contacts){
            res.send(contacts)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/contacts
// To save/add the contacts
app.post('/contacts', function(req, res){
    const body = req.body // es6 { body } = req
    const contact = new Contact(body)
    contact.save()
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
    })

//localhost:3000/contacts/:id
// To get single contacts
app.get('/contacts/:id', function(req, res){
    const id = req.params.id
    Contact.findById(id)
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/contacts/:id
// To find single record and delete.
app.delete('/contacts/:id', function (req, res){
    const id = req.params.id
    Contact.findByIdAndDelete(id)
        .then(function(contact){
            // When you are trying to find record by id, if the record is not found, it returns null, not be understood as promise being rejected
            if(contact){
                res.send({
                    contact,
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

//localhost:3000/contacts/:id
// To find record and update.
app.put('/contacts/:id', function(req, res){
    const id = req.params.id
    const body = req.body // es6 { body } = req.body
    Contact.findByIdAndUpdate(id, body, { new : true, runValidators: true})
        .then(function(contact){
            if(contact){
                res.send({
                    contact,
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