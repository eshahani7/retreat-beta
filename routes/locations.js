var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {authenticate} = require('./middleware/authenticate');

var {Loc} = require('../db/models/location');

router.use(bodyParser.json());

//---------------------ADMIN ONLY---------------------//
//GET /locations
router.get('/', (req, res) => {
  var city = req.body;

  Loc.find(city).then((locs) => {
    if(locs == null) {
      res.status(404).send();
    }
    res.status(200).send({locs});
  }).catch((e) => {
    res.status(400).send();
  });
});

//POST /locations
router.post('/', (req, res) => {
  var loc = new Loc(req.body);
  loc.save().then(() => {
    res.status(200).send(loc);
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
});

module.exports = router;
