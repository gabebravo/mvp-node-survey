const express = require('express');
const router  =  new express.Router();

const db   = require('../lib/db');
const User = db.mongoose.model('User');

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// const email = require("../node_modules/emailjs/email");
// const USER = process.env.EMAILJS_USER;
// const PASSWORD = process.env.EMAILJS_PASSWORD;

const uuid = require('uuid');

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
            email: user.email,
            success: true,
            message: 'Sucessfully logged in!',
            token: token
          });
        }
      }
    });
}

function resetPassword(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!user) {
      res.sendStatus(404);
    }

    res.json(user);
  });
}

// emailUser = (req, res) => {
//   User.findOne({
//     email: req.body.email
//   }, 'name')
//   .exec()
//   .then( user => {
//
//     let tempPass = uuid.v4();
//
//     let username = user.name;
//     let server  = email.server.connect({
//        user:    USER,
//        password: PASSWORD,
//        host:    "smtp-mail.outlook.com",
//        tls: {ciphers: "SSLv3"}
//     });
//
//     var message = {
//        text:    "i hope this works",
//        from:    "Admin <gabriel.bravo1@outlook.com>",
//        to:      "Gabe <gabecbravo@gmail.com>",
//        cc:      "",
//        subject: "testing emailjs",
//        attachment:
//        [
//           {data:'<html>i <i>hope</i> this works! Follow this <a href="heroku.com/name/user/reset/'+ tempPass +'">link</a></html>', alternative:true}
//        ]
//     };
//   server.send(message, function(err, message) { console.log(err || message); });
//
//   user.update({reset: tempPass}, function (err) {
//       if(err) {
//         res.status(200).json({message: 'Internal server error'});
//       }
//         res.status(200).json({message: 'An reset email was sent to you.'});
//    });
//
//   })
//   .catch( err => {
//     res.status(500).send(err);
//   });
// }

router.post('/authenticate', userLogin);
router.get('/',    getUsers);
router.post('/',   createUser);
// router.post('/email', emailUser);

module.exports = router;
