//part of the MVC design pattern  MODELS deal with data/databases in this case we're dealing with a json file
//controllers basically control whatever the route is doing for example the status it's sending, what data it's sending back, headers we want to send. Furthermore, it will get the data from the model. 
const Product = require('../models/productModel');
const Utils = require('../utils');

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
// @route POST /api/products
async function createProduct(req,res){
    try {
        /*
        heard coded version
       const product = {
          title: 'Test Product',
          description: 'This is my product',
          price: 100,
       }*/

        const body = await Utils.getpostData(req)
        const {title, description, price} = JSON.parse(body);

        const product = {
            title,
            description,
            price
        }
          const newProduct = await Product.create(product);
         // console.log('newProduct',newProduct)
            // 201 means created 
          res.writeHead(201, {'Content-Type': 'application/json'})
          return res.end(JSON.stringify(newProduct))
      
     
    } catch (error){
       console.log(error)
    }
}


// @desc Update a Product 
// @route PUT /api/product/:id
async function updateProduct(req,res,id){
    try {
     
        const product = await Product.findById(id);
       

        if (!product){
            console.log('product update', product)
            res.writeHead(404, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            const body = await Utils.getpostData(req);// the new data been added
            const {title, description, price} = JSON.parse(body);
             // product.title etc is what already is there
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
              const updProduct = await Product.update(id, productData);
             console.log('updProduct',updProduct)
                // 201 means created 
              res.writeHead(200, {'Content-Type': 'application/json'})
              return res.end(JSON.stringify(updProduct))
            
        }
  
    } catch (error){
       console.log(error)
    }
}

// @desc Delete Product 
// @route DELETE /api/product/:id
async function deleteProduct(req,res,id){
    try {
        const product = await Product.findById(id);
        if (!product){
            res.writeHead(404, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: `Product: ${id} removed.`}))
        }
    

    } catch (error){
       console.log(error)
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct

}