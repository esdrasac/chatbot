const db = require('mongoose')

const mongoConfig = require('../config/database')

class DataBase{
    constructor(){
        this.mongo()
    }

    mongo(){
        this.connection = db.connect('mongodb://localhost:27027/chatbot', mongoConfig)
    }
}

module.exports = new DataBase()