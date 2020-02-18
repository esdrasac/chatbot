const Squelize = require('sequelize');
const db = require('mongoose');

const dbConfig = require('../config/database');
const mongoConfig = require('../config/mongodb');

const User = require('../app/models/User');

const models = [User];

class DataBase {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Squelize(dbConfig);

    models.map((model) => model.init(this.connection));
  }

  mongo() {
    this.mongoConnection = db.connect(
      'mongodb://localhost:27017/chatbot',
      // 'mongodb+srv://chatbot:jsKpdhZFi1NL0S6V@cluster0-7kvzw.mongodb.net/chatbot?retryWrites=true&w=majority',
      mongoConfig,
    );
  }
}

module.exports = new DataBase();
