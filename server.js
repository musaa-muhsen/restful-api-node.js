const http = require('http');
//const products = require('./data/products');
//console.log(http) LOADS OF METHODS 

const server = http.createServer((req,res) => {
    //res.statusCode = 200
    // 201 means something is created and successful 
    // 300 range is redirects
    // 400 range is bad request 
    // 500 range are server errors 
    // setHeader the header is where you send: content type, authorization token
    // res.setHeader('Content-Type', 'text/html')
    //res.write('<h1>Hello World</h1>');
    //res.end()// works without end() tho but will keep sending request?
   // res.write(JSON.stringify(products))//JSON.stringify()


    console.log(req.method)
    if (req.url === '/api/products' && req.method === "GET"){
        res.writeHead(200, {'Content-Type': 'application/json'}) // instead of res.statusCode && res.setHeader

        res.end(JSON.stringify(products))
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'}) // instead of res.statusCode && res.setHeader
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))