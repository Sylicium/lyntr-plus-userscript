
// Simple web server
const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;



app.get('*', (req, res) => {
    if(fs.existsSync(`./public${req.url}.html`)){
        res.sendFile(`./public${req.url}.html`, {root: __dirname});
    } else {
        res.sendFile('./public/404.html', {root: __dirname});
    }
})