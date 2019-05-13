const http = require('http')
const port = 3000

const server = http.createServer(function(request, response){
if (request.url =='/'){
    response.status = 200
    response.end('Hello World')
}else if(request.url=='/about'){
    response.status = 200
    response.end('This is about page')
} else if(request.url=='/contact'){
    response.status = 200
    response.end('Contact page')
} else if(request.url=='/users'){
    response.status = 200
 response.setHeader('Content-Type', 'text/html')
 response.end('<ul><li>Ramesh</li><li>Suresh</li></ul')
} else if(request.url=='/products'){
    const products = [
        {id:1, name:'marker'},
        {id:2, name:'scale'}
    ]
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify(products))
}
else{
    response.status = 404
    response.end('404 Page not found..')
}
})

server.listen(port,function(){
    console.log('listening on port', port)
})