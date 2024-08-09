
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

    let log = `[lyntr+:${PORT}][${(new Date()).toLocaleString("FR-fr")}][${req.connection.remoteAddress}] ${req.method} -> ${req.path}   [${req.headers['user-agent']}]`

    // Rewrite line adding colors
    let colors = {
        "GET": "\x1b[32m",
        "POST": "\x1b[33m",
        "PUT": "\x1b[34m",
        "DELETE": "\x1b[31m",
        "PATCH": "\x1b[35m",
        "OPTIONS": "\x1b[36m",
        "HEAD": "\x1b[37m",
        "TRACE": "\x1b[38m",
        "CONNECT": "\x1b[39m",
    }
    let colors2 = {
        "bold": "\x1b[1m",
        "red": "\x1b[31m",
        "green": "\x1b[32m",
        "yellow": "\x1b[33m",
        "blue": "\x1b[34m",
        "magenta": "\x1b[35m",
        "cyan": "\x1b[36m",
        "white": "\x1b[37m",
        "gray": "\x1b[90m",
        "reset": "\x1b[0m",
    }
    let clrz = (what, value) => {
        if(what == "method"){
            return `${colors2.bold}${colors[value]}${value}${colors2.reset}`
        } else if(what == "path"){
            return `${colors2.green}${value}${colors2.reset}`
        } else if(what == "user-agent"){
            return `${colors2.yellow}${value}${colors2.reset}`
        } else {
            return value
        }
             
    }
    let log2 = `[lyntr+:${PORT}][${(new Date()).toLocaleString("FR-fr")}][${req.connection.remoteAddress}] ${clrz("method", req.method)} -> ${clrz("path", req.path).padEnd(60, " ")}   [${clrz("user-agent", req.headers['user-agent'])}]`

    console.log(log2)

    // If startsWith /assets/ return the file
    if (req.url.startsWith("/assets/")) {
        return res.sendFile(_DIRNAME_ + req.path)
    }
    if (req.url.startsWith("/api/")) {
        return;
    }
    if (req.url === "/") {
        return res.sendFile(_DIRNAME_ + "/index.html")
    }    
    if(fs.existsSync(_DIRNAME_ + req.path) && req.path.endsWith(".html")){
        return res.sendFile(_DIRNAME_ + req.path)
    } else if(fs.existsSync(_DIRNAME_ + req.path + ".html")){
        return res.sendFile(_DIRNAME_ + req.path + ".html")
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