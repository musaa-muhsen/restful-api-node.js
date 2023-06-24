const products = require('../data/products');
// const Uuid = require('uuid');
// console.log(Uuid.v4())
// same as below
const {v4: uuidv4} = require('uuid');
const Utils = require('../utils');


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
        resolve(newProduct) // this is for the api "visual process"
    })
}

module.exports = {
    findAll,
    findById,
    create
}