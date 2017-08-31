var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

var {User} = require('../db/models/user');
var {authenticate} = require('./middleware/authenticate');

router.use(bodyParser.json());

// POST /users (add new user)
router.post('/', (req, res) => {
  //var body = _.pick(req.body, ['email', 'password', 'age', 'name']);
  var body = req.body;
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    console.log(e);
    res.status(400).send(e);
  });
});

router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    console.log('success');
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
});

// DELETE /users/me/token --> logging out
router.delete('/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

// DELETE /users/me --> delete user profile
router.delete('/me', authenticate, (req, res) => {
  User.findByIdAndRemove(req.user.id).then((user) => {
    if(user != null) {
      res.send(user);
    }
    res.status(404).send();
  }).catch((e) => {
    res.status(400).send();
  });
});

// PATCH /users/me --> update profile
//fix hashing new password problem
router.patch('/me', authenticate, (req, res) => {
  req.user.email = req.body.email;
  req.user.firstName = req.body.firstName;
  req.user.lastName = req.body.lastName;
  req.user.age = req.body.age;
  if(req.body.password != null) {
    req.user.password = req.body.password;
  }

  req.user.save((user) => {
    res.status(200).send(user);
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;
