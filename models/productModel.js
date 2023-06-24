const products = require('../data/products');
// const Uuid = require('uuid');
// console.log(Uuid.v4())
// same as below
const {v4: uuidv4} = require('uuid');

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

module.exports = {
    findAll,
    findById
}