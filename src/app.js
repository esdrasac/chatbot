const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
require('./database/index.js');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.route();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
  }

  route() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
