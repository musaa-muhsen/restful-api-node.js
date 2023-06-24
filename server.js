const http = require('http');
//const products = require('./data/products');
//console.log(http) LOADS OF METHODS 
const Product = require('./controllers/productController')

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

    if (req.url === '/api/products' && req.method === "GET"){
        Product.getProducts(req,res)
        //res.writeHead(200, {'Content-Type': 'application/json'}) // instead of res.statusCode && res.setHeader

        //res.end(JSON.stringify(products))
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET"){
        // back slash "\" is to escape the forward slash 
        // if there is a match fire off in whatever in here 
       const id = req.url.split('/')[3]
       Product.getProduct(req, res, id)
    } else if (req.url === '/api/products' && req.method === 'POST') {
       // console.log('POST')
       Product.createProduct(req,res) 
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'}) // instead of res.statusCode && res.setHeader
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// the express way is like this -  
// api/products/:id
// req.params.id
