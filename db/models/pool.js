const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

//---------------POOL MODEL------------------//
var PoolSchema = new mongoose.Schema({
  location: {type: String, required: true},
  _creator: {type: mongoose.Schema.Types.ObjectId, required: true},
  startDate: {type: Date, required: true, default: new Date()},
  endDate: {type: Date, required: true}, //convert JSON to date object in client
  minPeople: {type: Number, required: true},
  goal: {type: Number, required: true},
  maxShare: {type: Number},
  themes: [{type: String}],
  restrictions: {
    gender: {type: String, maxLength: 1}, //drop down option front end
    minAge: {type: Number, min: 18},
    maxAge: {type: Number},
    isOpen: {type: Boolean, default: true} //secondary feature
  },
  currentShares: {type: Number},
  _userList: [{type: mongoose.Schema.Types.ObjectId}],
  poolCloses: {type: Date, required: true},
  poolClosed: {type: Boolean, required: true, default: false}
});

//--------------INSTANCE METHODS------------//
PoolSchema.methods.toJSON = function () {
  var pool = this;
  var poolObject = pool.toObject();

  return _.pick(poolObject, ['_id', 'location', '_creator', 'themes', 'restrictions', 'startDate']);
}

PoolSchema.methods.validateUser = function(user) {
  var pool = this;
  var rst = pool.restrictions;
  var valid = true;
  if(rst.gender != null)
    valid = user.gender == rst.gender;
  if(rst.minAge != null && rst.maxAge != null)
    valid = (user.age > rst.minAge && user.age < rst.maxAge);
  else if(rst.minAge != null)
    valid = user.age > rst.minAge;
  else if(rst.maxAge != null)
    valid = user.age < rst.maxAge;

  return valid;
}

var Pool = mongoose.model('Pool', PoolSchema);

module.exports = {Pool};
