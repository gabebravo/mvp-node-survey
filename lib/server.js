// import dependencies
const express = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const email = require('emailjs');
const uuid = require('uuid');
const {PORT, MORGAN} = require('../config');

// path for the router to re-route requests
const userRouter = require('../routes/user');
const surveyRouter = require('../routes/survey');
// const passwordRouter = require('../routes/password');

// server object to start up Express
class Server {
  constructor() {
    this.app  = express();
    this.port = PORT;

    this._setupMiddlewares();
    this._setupRoutes();
  }

  start() {
    this.app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  }

  _setupRoutes() {
    this.app.use('/user', userRouter);
    this.app.use('/survey', surveyRouter);
    this.app.use('/password', passwordRouter);
  }

  _setupMiddlewares() {
    this.app.use(
      morgan(MORGAN, {})
    );
    this.app.use(bodyParser.json());
    this.app.use('/password', express.static('public/password.html'))
    this.app.use(express.static('public'));
  }
}

module.exports = new Server();
