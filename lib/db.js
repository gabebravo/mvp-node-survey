const mongoose = require('mongoose');
const {DATABASE_URL} = require('../config');

const userSchema = require('../schemas/user');
const surveySchema = require('../schemas/survey');

mongoose.Promise = global.Promise;

class DB {
  constructor() {
    this.mongoose = mongoose;
    this._setupSchemas();
  }

  connect(done) {
    this.mongoose.connect(DATABASE_URL, (err) => {
      if (err) { return done(err); }
      console.log('Connected  to DB...');
      done(null);
    });
  }

  disconnect(done) {
    this.mongoose.disconnect((err) => {
      if (err) { return done(err); }
      console.log('Disconnected from DB...');
      done(null);
    });
  }

  _setupSchemas() {
    this.mongoose.model('User', userSchema);
    this.mongoose.model('Survey', surveySchema);
  }
}

module.exports = new DB();
