const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type    : String,
    required: true,
    unique: false
  },

  email: {
    type  : String,
    required: true,
    unique: true
  },

  password: {
    type  : String,
    required: true,
    unique: false
  },

  password_reset: {
    type  : String,
    required: false,
    unique: true
    // default: uuid.v4()
  },

  admin: {
    type  : Boolean,
    default: false
  }

});

userSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = userSchema;