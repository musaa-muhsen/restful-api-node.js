const fs = require('fs')
//file system

function writeDataToFile(filename,content){
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err){
            console.log(err)
        }
    })
}

function getpostData(req) {
    return new Promise((resolve,reject) => {
        try {
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

         req.on('end', () => {
            resolve(body)
         })

        } catch (error) {
            console.log(error)
           reject(err)
        }
    })
}

module.exports = {
    writeDataToFile,
    getpostData
}