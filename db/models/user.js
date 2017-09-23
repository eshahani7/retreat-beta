const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//----------------------USER MODEL-------------------//
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {type: String, required: true, minlength: 6},
  isAdmin: {type: Boolean, required: true},
  tokens: [{
    access: {type: String, required: true},
    token: {type: String, required: true}
  }],
  firstName: {type: String, minLength: 1, required: true},
  lastName: {type: String, minLength: 1, required: true},
  age: {type: Number, min: 18, required: true},
  gender: {type: String, maxLength: 1, required: true},
  payment: {
    name: {type: String},
    ccNumber: {
      type: String,
      //required: true,
      validate: {
        validator: validator.isCreditCard,
        message: '{VALUE} is not a valid credit card number'
      }
    },
    expDate: {
      month: {type: Number},
      year: {type: Number} //validate through stripe
    }
  },
  billingAddress: {
    streetAdd: {type: String},
    city: {type: String},
    state: {type: String, minLength: 2, maxLength: 2},
    zip: {type: Number}
  },
  picture: String
});


//----------------------INSTANCE METHODS-------------------//
//use to override response of http post
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'firstName', 'lastName', 'age', 'gender']);
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'salt123').toString();

  user.tokens.push({access, token});

  //return allows chaining
  return user.save().then(() => {
    return token; //success arg for next then call
  });
};

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token} //remove entire if token matches arg
    }
  });
};



//----------------------STATIC METHODS-------------------//
UserSchema.statics.findByToken = function(token) {
  var User = this; //model is in the "this" binding
  var decoded;

  try {
    decoded = jwt.verify(token, 'salt123');
  } catch(e) {
    return Promise.reject(); //if arg provided, passed to e in catch block
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token, //wrap in quotes to access nested element
    'tokens.access': 'auth' //not a var
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};



//---------------MONGOOSE MIDDLEWARE-----------------//
//run this code before save --> hash password & ccNumber
UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password')) { //only want to hash if pass was just edited
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }
  else {
    next();
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('payment.ccNumber')) { //only want to hash if pass was just edited
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.payment.ccNumber, salt, (err, hash) => {
        user.payment.ccNumber = hash;
        next();
      });
    });
  }
  else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User}; //set User property equal to User variable
