const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  age: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  mobile_phone: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  cpf: {
    type: String,
    default: null,
  },
  cnpj: {
    type: String,
    default: null,
  },

  address: {
    cep: {
      type: String,
      default: null,
    },
    street: {
      type: String,
      default: null,
    },
    number: {
      type: String,
      default: null,
    },
    neighborhood: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('leads', LeadSchema);
