const mongoose = require('mongoose');
const _ = require('lodash');

//--------------------BOOKING MODEL----------------//
var BookingSchema = new mongoose.Schema({
  _locId: {type: mongoose.Schema.Types.ObjectId, required: true},
  _poolId: {type: mongoose.Schema.Types.ObjectId, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true}
});

//-------------------INSTANCE METHODS-------------//
BookingSchema.methods.toJSON = function(){
  var booking = this;
  var bookingObject = booking.toObject();
  return _.pick(bookingObject, ['_id', '_locId', '_poolId', 'startDate', 'endDate']);
}

var Booking = mongoose.model('Booking', BookingSchema);

module.exports = {Booking};
