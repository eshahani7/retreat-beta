var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {authAdmin} = require('./middleware/authenticate');

var {Booking} = require('../db/models/booking');

router.use(bodyParser.json());

//------------------ADMIN ONLY---------------------//
//POST /bookings
router.post('/', authAdmin, (req, res) => {
  var body = req.body;
  if(!ObjectID.isValid(body._locId) || !ObjectID.isValid(body._poolId)) {
    res.status(404).send();
  }

  var booking = new Booking(body);
  booking.save().then(() => {
    res.status(200).send(booking);
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
});

//GET /bookings
router.get('/', authAdmin, (req, res) => {
  Booking.find({}).then((bookings) => {
    if(bookings == null) {
      res.status(404).send();
    }
    res.status(200).send({bookings});
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;
