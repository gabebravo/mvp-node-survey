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

function addUserToVoteArray(req, res) {
  Survey
  .findOne({ _id: req.params.id }, 'users stats')
  .exec()
  .then(survey => {
      survey.users.forEach(function( val ){
        if(val.id == req.body.id){
          res.status(200).json({message: 'Sorry you already voted'});
        }
      });
    survey.users.push({id: req.body.id});
      survey.save(err => { // save the new info
        if(err){
          res.send(err);
        }
        res.status(200).json({
          message: 'Your vote was added',
          survey: survey
        });
      });
  })
  .catch(
    err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
  });
}

function incrementVote(req, res) {
  Survey
  .findOne({ _id: req.params.id }, 'users stats')
  .exec()
  .then(survey => {
    let newStats = survey.stats;
    let votingTopic = req.body.topic;

      for(var key in newStats) {
        if (newStats.hasOwnProperty(votingTopic)) {
         if ( key === votingTopic ){
              ++newStats[key];
         }
       }
      }
      survey.update({stats: newStats}, function (err) {
          if(err) {
            res.status(200).json({message: 'Internal server error'});
          }
          res.status(200).json({message: 'Congrats you voted'});
      });
  })
  .catch(
    err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
  });
}

createSurvey = (req, res) => {
  const survey = new Survey(req.body);
  survey.save()
    .then(survey => {
      res.status(200).json({survey: survey});
      //res.status(200).json({message: 'Congrats survey added'});
    }).catch(err => {
        res.status(500).send({message: 'Internal server error'});
    });
}

deleteSurvey = (req, res) => {
  Survey.remove({
    _id: req.params.id
  })
  .exec()
  .then( survey => {
    res.status(200).json({message: "The survey was sucessfully delteted"});
  }).catch( err => {
    res.status(500).send(err);
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
router.post('/vote/:id', addUserToVoteArray);
router.post('/increment/:id', incrementVote);
router.post('/create',   createSurvey);
router.delete('/:id', deleteSurvey);

module.exports = router;

// db.surveys.insertOne(
//   {
//     "name" : "Favorite Icecream"",
//     "description" : "What is your favorite iceream?",
//     "users" : [
//       { "id" : "GB123@gmail.com" }
//     ],
//     "stats" : {
// 		   "Chocolate": 0,
//       "Vanilla": 0,
//       "Strawberry": 0
// 	   },
//     "expiration" : "1502668800000"
//   }
// );
