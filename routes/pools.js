var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');

var {User} = require('../db/models/user');
var {authenticate} = require('./middleware/authenticate');

var {Pool} = require('../db/models/pool');

router.use(bodyParser.json());

// ---------------CREATORS ONLY---------------------//
// POST /pools --> create new pool
router.post('/', authenticate, (req, res) => {
  var body = req.body;
  var pool = new Pool(req.body);
  pool._creator = req.user._id;
  pool._userList.push(req.user._id);
  pool.endDate = pool.startDate;
  pool.poolCloses = pool.endDate; //need to decide when to close pools

  pool.save().then(() => {
    res.status(200).send(pool);
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
});

// PATCH /pools/edit/:id --> edit details of pool (creator only)
router.patch('/edit/:id', authenticate, (req, res) => {

});

// PATCH /pools/edit/:id --> delete pool (creator only)
router.delete('/edit/:id', authenticate, (req, res) => {

});


//-----------------PUBLIC---------------------------//
// GET /pools/:id --> get full details of a particular pool
router.get('/:id', (req, res) => {

});

// GET /pools --> get pools based on query params
router.get('/:query', (req, res) => {

});


//-------------------REGISTERED USERS----------------//
// POST /pools/join/:id --> join existing pool
router.post('/join/:id', authenticate, (req, res) => {
  var id = req.params.id;

  Pool.findById(id).then((pool) => {
    if(pool.validateUser(req.user)) {
      pool._userList.push(req.user.id);
      pool.save().then(() => {
        res.status(200).send(pool);
      }).catch((e) => {
        console.log(e);
        res.status(400).send();
      })
    }
    else {
      res.status(400).send();
    }
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  })
});

// GET /pools/me --> get pools joined by user
router.get('/me', authenticate, (req, res) => {

});

module.exports = router;
