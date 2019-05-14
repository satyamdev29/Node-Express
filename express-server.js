const express = require('express')
const app = express()
const port = 3000

// Request Handler ( Route handlers)
// app.httpMethod(path, function)
//localhost:3000

function logRequests(request){
    console.log(request.url, request.ip, request.method, new Date())
}

app.get('/', function(request, response){
    logRequests(request)
    response.send('Hello world')
})

//localhost:3000/contact
app.get('/contact', function(request, response){
    logRequests(request)
    response.send('Contact us page')
})

//localhost:3000/users
app.get('/users', function(request, response){
    logRequests(request)
    response.send('<ul><li>Suresh</li><li>Ramesh</li></ul>')
})

//localhost:3000/products
// with arrow function
app.get('/products', (req, res)=>{
// with es5
//app.get('/products', function(req, res){
    logRequests(req)
    const products = [
        {id:1, name:'marker'},
        {id:2, name:'scale'}
    ]
    res.send(products)
})
//es5
//app.listen(port,function(){
app.listen(port,()=>{
 console.log('listening on port', port)
})