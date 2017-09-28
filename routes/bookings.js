var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const env = require('node-env-file');
const stripe = require('stripe')(process.env.STRIPE_KEY_SECRET);

var {authAdmin, authenticate} = require('./middleware/authenticate');

var {Booking} = require('../db/models/booking');
var {Pool} = require('../db/models/pool');
var {Loc} = require('../db/models/location');

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
    Pool.findByIdAndUpdate(req.body._poolId, {$set: { poolBooked: true }}).then((pool) => {
      res.status(200).send(pool);
    }).catch((e) => {
      console.log(e);
      res.status(400).send();
    });
  //  res.status(200).send(booking);
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

//------------------REGISTERED USERS--------------------//
//GET /details/:id
router.get('/details/:id', authenticate, (req, res) => {
  var poolId = req.params.id;
  Booking.findOne({ _poolId: poolId }).then((booking) => {
    if(booking == null) {
      res.status(404).send();
    }
    Loc.findOne({ _id: booking._locId }).then((loc) => {
      res.status(200).send([loc, booking]);
    }).catch((e) => {
      console.log(e);
      res.status(400).send();
    })
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
});

router.post('/charge', (req, res) => {
  let amount = 500;
  console.log(req.body);

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then((charge) => {
    res.status(200).send(charge);
  }).catch((e) => {
    res.status(400).send();
  });
})

module.exports = router;
