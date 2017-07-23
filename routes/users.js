var express = require('express');
var router = express.Router();
const _ = require('lodash');

var {User} = require('../db/models/user');

// POST /users (add new user)
router.post('/', (req, res) => {
  //var body = _.pick(req.body, ['email', 'password', 'age', 'name', 'payment', 'billingAddress']);
  var body = req.body;
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

module.exports = router;
