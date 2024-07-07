import http from 'node:http';
import fs from "node:fs";

const PORT = 8000;

    // get initial 4chan bundle
    

const server = http.createServer((req, res) => {
    //some code to deliver the base html page.
    res.writeHead(200, {"Content-Type": "text/html"}); 
    fs.readFile('./pages/index.html', (error, data) => {
        if (error) {
            res.writeHead(404)
            res.write("Error:File not found")
        } else {
            res.write(data)
        }

        res.end()
    })

    //deliver initial 4chan bundle
    //res.writeHead(200, {}) 
    //then only get new 4chan bundle upon button click from frontend

})     //this function handles all HTTP requests to the server


server.listen(PORT , (error) => {
    if (error) {
        console.log('something went wrong')
    } else {
        console.log(`server is listening on port ${PORT}`)

    }
})