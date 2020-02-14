const express = require('express')

const routes = require('./routes')

class App{
    constructor(){
        this.server = express()
        this.middleware()
        this.route()
    }

    middleware(){
        this.server.use(express.json())
    }

    route(){
        this.server.use(routes)
    }
}

module.exports = new App().server