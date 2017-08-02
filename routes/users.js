var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');

var {User} = require('../db/models/user');
var {authenticate} = require('./middleware/authenticate');

router.use(bodyParser.json());

// POST /users (add new user)
router.post('/', (req, res) => {
  //var body = _.pick(req.body, ['email', 'password', 'age', 'name']);
  var body = req.body;
  var user = new User(body);
  console.log(req.body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    //console.log(e);
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
router.patch('/me', authenticate, (req, res) => {
  User.findOneAndUpdate({_id: req.user.id}, {$set: req.body}, {new: true}).then((user) => {
    if(user != null) {
      res.status(200).send(user);
    }
    return res.status(404).send();
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;
