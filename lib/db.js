const mongoose = require('mongoose');
const config   = require('../config');

// const userSchema = require('../schemas/user');
// const eventSchema = require('../schemas/event');

mongoose.Promise = global.Promise;

class DB {
  constructor() {
    this.mongoose = mongoose;
    this._setupSchemas();
  }

  connect(done) {
    this.mongoose.connect(config.mongo, (err) => {
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
    // this.mongoose.model('User', userSchema);
    // this.mongoose.model('Event', eventSchema);
  }
}

module.exports = new DB();
