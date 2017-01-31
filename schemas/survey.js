const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({

  name: {
    type    : String,
    required: true,
    unique: false
  },

  description: {
    type    : String,
    required: true,
    unique: false
  },

  users: { type : Array , "default" : [] },
  stats: {},

  expiration: {
    type: Date,
    required: true,
    unique: false
  }

});

module.exports = surveySchema;
