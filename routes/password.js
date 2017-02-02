const express = require('express');
const router  =  new express.Router();

const db   = require('../lib/db');
const User = db.mongoose.model('User');

function resetPassword(req, res) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json({message: "You hit the password endpoint"});
}

router.get('/change',   resetPassword);

module.exports = router;
