let products = require('../data/products'); // has to be let because it gets reassigned in remove()
// const Uuid = require('uuid');
// console.log(Uuid.v4())
// same as below
const {v4: uuidv4} = require('uuid');
const Utils = require('../utils');
//console.log('products', typeof products)

function findAll(){
    // typically if returning from database you return a promise 
    return new Promise((resolve,reject) => {
        resolve(products)
    })
}

function findById(id){
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve,reject) => {
        const newProduct = {id: uuidv4(), ...product};
        products.push(newProduct) // add to the existing array 
        //const x = products.push(newProduct);
        // console.log('x', x)  returns a number
        Utils.writeDataToFile("./data/products.json", products); // this is actually writing it in
        resolve(newProduct) // this is for the api "visual process"??? NO! sent back to the controller 
    })
}

// product is just title,desc,price
function update(id,product) {
    return new Promise((resolve,reject) => {
        const index = products.findIndex((p) => p.id === id); 
        products[index] = {id,...product}; // add the existing/already id
        // console.log('index',index)
        // console.log('product[index]',products[index])
        Utils.writeDataToFile("./data/products.json", products); // this is actually writing it in
        resolve(products[index]) // this is what get's resolved ie sent back to the controller?
    })
}


function remove(id) {
    return new Promise((resolve,reject) => {
        products = products.filter((p) => p.id !== id); // so filter out the products that aren't equal
        Utils.writeDataToFile("./data/products.json", products); // this is actually writing it in
        resolve() // this is what get's resolved ie sent back
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}