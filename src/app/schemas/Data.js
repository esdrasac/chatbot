const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  client_id: {
    type: String,
    allowNull: false,
  },
  user_id: {
    type: String,
    allowNull: false,
  },
  input: {
    type: String,
    default: '',
  },
  output: {
    type: String,
    default: 'Desculpe, mas não entendi',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('data', LeadSchema);
