const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  input: {
    type: String,
    default: null,
  },
  output: {
    type: String,
    default: 'Desculpe, mas não entendi',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('data', LeadSchema);
