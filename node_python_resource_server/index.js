const express = require('express')
const app = express()
const path = require('path');

app.get('/python-server/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'url': path.resolve('./WinPython-32bit-3.5.4.1Zero/python-3.5.4/python.exe')}));   
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))