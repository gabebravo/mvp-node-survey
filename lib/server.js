// import dependencies
const express = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');

class Server {
  constructor() {
    this.app  = express();
    this.port = config.port;
    this.config = config;

    this._setupMiddlewares();
    this._setupRoutes();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Listening at port ${this.port}`);
    });
  }

  _setupRoutes() {
  }

  _setupMiddlewares() {
    this.app.use(
      morgan(config.morgan, {})
    );
    this.app.use(bodyParser.json());
    this.app.use(express.static('public'));
  }
}

module.exports = new Server();
