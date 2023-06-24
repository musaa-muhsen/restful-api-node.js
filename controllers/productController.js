//part of the MVC design pattern  MODELS deal with data/databases in this case we're dealing with a json file
//controllers basically control whatever the route is doing for example the status it's sending, what data it's sending back, headers we want to send. Furthermore, it will get the data from the model. 
const Product = require('../models/productModel');

// @desc Gets All Products 
// @route GET /api/products
async function getProducts(req,res){
    try {
        const products = await Product.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'}) // instead of res.statusCode && res.setHeader
        res.end(JSON.stringify(products))

    } catch (error){
       console.log(error)
    }
}

// @desc Gets Single Product 
// @route GET /api/product/:id
async function getProduct(req,res,id){
    try {
        const product = await Product.findById(id);
        if (!product){
            res.writeHead(404, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify(product))
        }
    

    } catch (error){
       console.log(error)
    }
}

// @desc Create a Product 
// @route POST /api/product/:id
async function createProduct(req,res){
    try {
        /*
        heard coded version
       const product = {
          title: 'Test Product',
          description: 'This is my product',
          price: 100,
       }*/

       //https://nodejs.org/docs/latest/api/events.html#emitteroneventname-listener
       let body = ''; // empty string to start with
       // the request 
       // express would be like req.body.data ???
       req.on('data', (chunk) => {
        /*
        chunk looks like this
        chunk <Buffer 7b 0a 20 20 20 20 22 74 69 74 6c 65 22 3a 20 22 42 72 61 64 73 20 50 72 6f 64 75 63 74 22 2c 0a 20 20 20 20 22 64 65 73 63 72 69 70 74 69 6f 6e 22 3a ... 38 more bytes>
        */
        //console.log('chunk',chunk.toString())
          
          body += chunk.toString()
       })

       req.on('end', async () => {

        console.log('body',body)

        const {title, description, price} = JSON.parse(body);

        const product = {
            title,
            description,
            price
        }
          const newProduct = await Product.create(product);
          console.log('newProduct',newProduct)
            // 201 means created 
          res.writeHead(201, {'Content-Type': 'application/json'})
          return res.end(JSON.stringify(newProduct))
       })
     
    } catch (error){
       console.log(error)
    }
}




module.exports = {
    getProducts,
    getProduct,
    createProduct

}