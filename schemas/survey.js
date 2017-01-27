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

// surveyObj = {
//  name : "Favorite Icecream",
//     "description" : "What is your favorite iceream?",
//     "stats" : {
// 		 "Chocolate": 0,
//       "Vanilla": 0,
//       "Strawberry": 0
// 	 },
//     "expiration" : "1502668800000"
// };
