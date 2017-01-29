require('dotenv').config();

const server = require('./lib/server');
const db     = require('./lib/db');

db.connect((err) => {
  if (err) {
    return console.log(`DB is not working...`);
  }

  server.start();
});
