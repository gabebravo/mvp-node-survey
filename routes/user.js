const express = require('express');
const router  =  new express.Router();

const db   = require('../lib/db');
const User = db.mongoose.model('User');

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function getUsers(req, res) {
  User.find((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!users) {
      res.sendStatus(404);
    }
    res.status(200).json(users);
  });
}

createUser = (req, res) => {
  const user = new User(req.body);

  user.save()
    .then((user) => {
      res.status(200).json(user);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function userLogin(req, res) {
  // find the user
    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (!user.comparePassword(req.body.password)) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          const token = jwt.sign(user, SECRET, { expiresIn: 3600 }); // 1 hour

          // return the information including token as JSON
          res.status(200).json({
            name: user.name,
            admin: user.admin,
            success: true,
            message: 'Sucessfully logged in!',
            token: token
          });
        }
      }
    });
}

// function getUserById(req, res) {
//   User.findById(req.params.id, (err, user) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//
//     if (!user) {
//       res.sendStatus(404);
//     }
//
//     res.json(user);
//   });
// }
//
// function deleteUser(req, res) {
//   User.remove({
//       _id: req.params.id}, (err, user) => {
//     if (err) {
//       res.send(err);
//     }
//     res.status(204).end();
//   });
// }
//
// function updateUser(req, res) {
//   User.findById({
//     _id: req.params.id}, (err, user) => {
//     // an empty find will return everything
//     if (err) {
//       res.send(err);
//     }
//     user.name = req.body.name;
//     user.password = req.body.password;
//     user.save(err => { // save the new info
//       if(err){
//         res.send(err);
//       }
//       res.status(204).end();
//     });
//   });
// }
//

router.post('/authenticate', userLogin);
// requireAuthenticationOnRoutes();
router.get('/',    getUsers);
// router.get('/:id', getUserById);
router.post('/',   createUser);
// router.delete('/:id', deleteUser);
// router.put('/:id', updateUserPssword);

module.exports = router;

// db.users.insertOne({
//   "name": "Gabe Bravo",
//   "email": "GB123@gmail.com",
//   "password": "ilovecats",
//   "admin": true
// });

// {
// 	  "name": "Melvin Martian",
//     "email": "MM123@gmail.com",
//     "password": "looneytunes"
// }
// {
//   "name": "Johnny Blaze",
//   "email": "JB123@gmail.com",
//   "password": "methodman",
// }
// {
//   "name": "Tony Starks",
//   "email": "TS123@gmail.com",
//   "password": "ghostfacekilla",
// }
// {
//   "name": "Elves Presley",
//   "email": "EP123@gmail.com",
//   "password": "hounddog"
// }
// {
//   "name": "Melvin Martian",
//   "email": "MM123@gmail.com",
//   "password": "looneytunes"
// }
