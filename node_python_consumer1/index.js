const express = require('express')
const app = express()
const path = require('path');
var request = require('request');

let runPy = (py_url, name)=>{
    return new Promise(function(sucess, nosuccess) {

        const { spawn } = require('child_process');
        const pyprog = spawn( py_url ,
        ['./py_scripts/hello.py', name]);
    
        pyprog.stdout.on('data', (data) => {   sucess(data);    });
        pyprog.stderr.on('data', (data) => {   nosuccess(data);  });
    
    });
} 

app.get('/python-client1/:name', (req, res) => {
    request('http://localhost:3000/python-server/', function (error, response, body) {
        let py_url = JSON.parse(body).url
        let name = req.params.name
        runPy(py_url, name).then((fromRunpy) => {
            console.log(fromRunpy.toString());
            res.end(fromRunpy);
        });

      });
})

app.get('/python-server/', (req, res) => {  
    runPy.then((fromRunpy) => {
        console.log(fromRunpy.toString());
        res.end(fromRunpy);
    });

})

app.listen(3001, () => console.log('Example app listening on port 3001!'))