const mongoose = require('mongoose');
const _ = require('lodash');

//--------------------LOC MODEL------------------//
var LocSchema = new mongoose.Schema({
  city: {type: String, required: true},
  listingUrl: {type: String, required: true},
  numBed: {type: Number, required: true},
  numBath: {type: Number, required: true},
  maxCapacity: {type: Number, required: true}
});

//-------------------INSTANCE METHODS-------------//
LocSchema.methods.toJSON = function(){
  var loc = this;
  var locObject = loc.toObject();
  return _.pick(locObject, ['_id', 'city', 'listingUrl', 'numBed',
  'numBath', 'maxCapacity']);
}

var Loc = mongoose.model('Loc', LocSchema);

module.exports = {Loc};
