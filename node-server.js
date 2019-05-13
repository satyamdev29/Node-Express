const http = require('http') // http is module we'll require first http module and store in one one varaible that is call http
const port = 3000 // Set port number

// http variable have createServer object which will help to setup server and function will return and store in server variable.

const server = http.createServer(function(request, response){
if (request.url =='/'){
    response.end('Hello World') 
}else if(request.url=='/about'){
    response.end('This is about page')
} else if(request.url=='/contact'){
    response.end('Contact page')
} else if(request.url=='/users'){
    response.status = 200
 response.setHeader('Content-Type', 'text/html') // setting header content to understand and execute html element and render on page. If we'll not set Header then we'll get plain text.
 response.end('<ul><li>Ramesh</li><li>Suresh</li></ul')
} else if(request.url=='/products'){
    const products = [
        {id:1, name:'marker'},
        {id:2, name:'scale'}
    ]
    response.setHeader('Content-Type', 'application/json') // set header to get json data.
    response.end(JSON.stringify(products)) // parse jsone data and convert to string to read object.
}
else{
    response.status = 404
    response.end('404 Page not found..')
}
})

// listening port number

server.listen(port,function(){
    console.log('listening on port', port)
})