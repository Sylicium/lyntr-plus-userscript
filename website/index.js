
// Simple web server
const axios = require("axios")
const fs = require("fs")
const express = require('express');
// const bodyParser = require('body-parser');
const app = express(); // Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'Window': Request with GET/HEAD method cannot have body.
app.use(express.urlencoded())
app.use(express.json())
//app.use(bodyParser.json({ type: 'application/*+json' }))
const serv = require('http').createServer(app);

const PORT = 88;
const _DIRNAME_ = __dirname + "/site";


// Make the app.get("*") to parse every request
app.get('*', (req, res) => {

    console.log(req.url)

    // If startsWith /assets/ return the file
    if (req.url.startsWith("/assets/")) {
        return res.sendFile(_DIRNAME_ + req.path)
    }
    // If startsWith /api/ return the file
    if (req.url.startsWith("/api/")) {
        return;
    }
    if (req.url === "/") {
        return res.sendFile(_DIRNAME_ + "/index.html")
    }
    return res.sendFile(_DIRNAME_ + "/404.html")
})

app.all('/api', (req, res) => {
    return res.send({
        status: 400,
        message: "Bad Request"
    })
})

serv.listen(PORT, () => {
    console.log(`Server listening on port ${serv.address().port}`);
});