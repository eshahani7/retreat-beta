var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');

var {User} = require('../db/models/user');
var {authenticate} = require('./middleware/authenticate');

var {Pool} = require('../db/models/pool');

router.use(bodyParser.json());

router.post('/', authenticate, (req, res) => {
  var body = req.body;
  var pool = new Pool(req.body);
  pool.save().then(() => {
    res.status(200).send(pool);
  }).catch((e) => {
    res.status(400).send();
  });
});
