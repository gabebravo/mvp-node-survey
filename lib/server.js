// import dependencies
const express = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const email = require("../node_modules/emailjs/email");
// const uuid = require('uuid');
const {PORT, MORGAN} = require('./config');

// path for the router to re-route requests
const userRouter = require('../routes/user');
const surveyRouter = require('../routes/survey');

// server object to start up Express
class Server {
  constructor() {
    this.app  = express();
    this.port = PORT;
    this.config = config;

    this._setupMiddlewares();
    this._setupRoutes();
  }

  start() {
    this.app.listen(PORT, () => {
      console.log(`Listening at port`);
    });
  }

  _setupRoutes() {
    this.app.use('/user', userRouter);
    this.app.use('/survey', surveyRouter);
  }

  _setupMiddlewares() {
    this.app.use(
      morgan(MORGAN, {})
    );
    this.app.use(bodyParser.json());
    this.app.use(express.static('public'));
  }
}

module.exports = new Server();
