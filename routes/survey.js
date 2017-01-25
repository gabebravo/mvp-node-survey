const express = require('express');
const router  =  new express.Router();

const db   = require('../lib/db');
const Survey = db.mongoose.model('Survey');

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function getSurveys(req, res) {
  Survey
    .find()
    .limit(10)
    .exec()
    .then(surveys => {
      res.status(200).json(surveys);
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
}

function getSurveyById(req, res) {
  Survey
  .findById(req.params.id)
  .exec()
  .then(survey => {
    res.status(200).json(survey);
  })
  .catch(
    err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
  });
}

function requireAuthenticationOnRoutes() {
  router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, SECRET, function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });

    }
  });
}

requireAuthenticationOnRoutes();
router.get('/',    getSurveys);
router.get('/:id', getSurveyById);
// router.post('/',   createSurvey);
// router.delete('/:id', deleteSurvey);

module.exports = router;

// db.surveys.insertOne(
//   {
//     "name" : "Space Travel",
//     "description" : "Should the US go to the Moon?",
//     "users" : [
//       { "id" : "5886bd81298d8622e90c45bd" },
//       { "id" : "5886eb5502bc013d4a4a0eef" }
//     ],
//     "stats" : [
//       {"answerItem": "Yes", "count": "72"},
//       {"answerItem": "No", "count": "3"}
//     ],
//     "expiration" : "1502668800000"
//   }
// );
