var express = require('express');
var router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const schedule = require('node-schedule');

var {User} = require('../db/models/user');
var {authenticate, authAdmin} = require('./middleware/authenticate');

var {Pool} = require('../db/models/pool');

router.use(bodyParser.json());

// ---------------CREATORS ONLY---------------------//
// POST /pools --> create new pool
router.post('/', authenticate, (req, res) => {
  var body = req.body;
  var pool = new Pool(req.body);
  pool._creator = req.user._id;
  pool._userList.push(
    [req.user.firstName + " " + req.user.lastName, req.user._id]
  );
  
  pool.poolCloses = pool.endDate; //need to decide when to close pools
  schedule.scheduleJob(pool.poolCloses, () => {
    pool.poolClosed = true;
    pool.save().then(() => {
      console.log('pool closed');
    }).catch((e) => {
      console.log(e);
      console.log('error with closing pool');
    });
  });

  pool.save().then(() => {
    res.status(200).send(pool);
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
});

// DELETE /pools/edit/:id --> delete pool (creator only)
router.delete('/delete/:id', authenticate, (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Pool.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((pool) => {
    if(pool != null) {
      res.send({pool});
    }
    res.status(404).send();
  }).catch((e) => {
    res.status(400).send();
  });
});

//Note: not adding edit option to owner for now


//-----------------PUBLIC---------------------------//
// GET /pools/:id --> get full details of a particular pool
router.get('/details/:id', (req, res) => {
  var id = req.params.id;
  Pool.findById(id).then((pool) => {
    res.status(200).send(pool);
  }).catch((e) => {
    console.log(e);
    res.status(404).send();
  });
});

// POST /pools/list --> get pools based on query params
router.post('/list', (req, res) => {
  var query = req.body;
  if(query.startDate != null && query.endDate != null) {
    query.startDate = {$gte: query.startDate};
    query.endDate = {$lte: query.endDate};
  }
  if(query.themes != null) {
    query.themes = {$in: query.themes}
  }

  Pool.find(query).then((pools) => {
    if(pools == null) {
      res.status(404).send();
    }
    res.status(200).send({pools});
  }).catch((e) => {
    res.status(400).send();
  });
});


//-------------------REGISTERED USERS----------------//
// POST /pools/join/:id --> join existing pool
router.post('/join/:id', authenticate, (req, res) => {
  var id = req.params.id;
  console.log(req.params.id);
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Pool.findById(id).then((pool) => {
    if(pool.validateUser(req.user)) {
      pool._userList.push(
        [req.user.firstName + " " + req.user.lastName, req.user._id]
      );
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
  Pool.find({_userList: { "$in" :[[req.user.firstName + ' ' + req.user.lastName, req.user._id]]}})
  .then((pools) => {
    res.status(200).send({pools});
  }).catch((e) => {
    res.status(400).send();
  });
});

//GET /pools/in/:id
router.get('/in/:id', authenticate, (req, res) => {
  var poolId = req.params.id;
  var userId = req.user._id;

  Pool.findById(poolId).then((pool) => {
    var list = pool._userList;

    for(var i = 0; i < list.length; i++) {
      if(list[i][1].equals(userId)) { //id is second element in userList
        res.status(200).send();
      }
    }
    res.status(404).send();
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  })
});

// DELETE /pools/leave/:id --> leave existing pool
router.delete('/leave/:id', authenticate, (req, res) => {
  var pool;
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Pool.findById(id).then((pool) => {
    var index = pool._userList.indexOf([req.user.firstName + ' ' + req.user.lastName, req.user._id]);
    pool._userList.splice(index, 1);
    pool.save().then(() => {
      res.status(200).send(pool);
    }).catch((e) => {
      console.log(e);
      res.status(400).send();
    })
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
});

//----------------------ADMINS---------------------//
router.get('/admin/list', authAdmin, (req, res) => { //to list closed pools
  Pool.find({ poolClosed: true, poolBooked: false }).then((pools) => {
    if(pools == null) {
      res.status(404).send();
    }
    res.status(200).send({pools});
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;
