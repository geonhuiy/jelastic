const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Connections: [{type: mongoose.Types.ObjectId, ref: 'Connections'}],
  Title: String,
  AddressLine1: String,
  Town: String,
  StateOrProvince: String,
  PostCode: String,
  Location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], //Long - lat
      required: true,
    }
  }
});

module.exports = mongoose.model('Station', stationSchema);
