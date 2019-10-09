const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    name: String,
    countries: {
      type: Number,
    }
  },
  population: {
    type: Number,
    required: true,
    min: 1,
    max: 8000000000
  },
  isEndangered: {
    type: Boolean,
    default: false
  },
  wordOrder: [{
    type: String,
    enum: ['SOV', 'SVO', 'VSO', 'VOS', 'OVS', 'OSV']
  }],
});

module.exports = mongoose.model('Language', schema);