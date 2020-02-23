const _ = require('lodash');
const yup = require('yup');
const axios = require('axios');
const CPF = require('@fnando/cpf/commonjs');

const Lead = require('../schemas/Lead');

class Validation {
  async getDocuments(question = '') {
    this.question = question.toString().trim();
    const documents = {};

    const questionTokens = question.split('');

    for (let i = 0; i < questionTokens.length; i++) {
      const word = questionTokens[i].toString().trim();

      if (word.length > 1) {
        if (!documents.email) documents.email = this.isValidEmail(word);
        if (!documents.mobile_Phone) documents.mobile_Phone = this.isValidMobilePhone(word);
        if (!documents.phone) documents.phone = this.isValidPhone(word);
        if (!documents.address) documents.address = this.isValidZipcode(word);
        if (!documents.cpf) documents.cpf = this.isValidCpf(word);
        if (!documents.cnpj) documents.cnpj = this.isValidCnpj(word);
      }
    }

    if (_.isEmpty(documents)) {
      return false;
    }

    await Lead.create(documents);


    return true;
  }

  async isValidEmail(email) {
    const schema = yup.string()
      .email();

    if (!(await schema.isValid(email))) {
      return null;
    }

    return email;
  }

  isValidMobilePhone(mobile_Phone) {
    this.mobile_Phone = mobile_Phone.replace(/[^0-9]/g);

    if (this.mobile_Phone.indexOf('55' === 0)) {
      this.mobile_Phone = this.mobile_Phone.replace('55', '');
    }

    if (this.isValidCpf(this.mobile_Phone)) {
      return null;
    }

    if (this.mobile_Phone.length === 11 && this.mobile_Phone.indexOf('9') === 2) {
      return this.mobile_Phone;
    }

    return null;
  }

  isValidPhone(phone) {
    this.phone = phone.replace(/[^0-9]/g);

    if (this.phone.indexOf('55' === 0)) {
      this.phone = this.phone.replace('55', '');
    }

    if (this.phone.length === 10) {
      return this.phone;
    }

    return null;
  }

  isValidZipcode(zipcode) {
    this.zipcode = zipcode.replace(/[^0-9]/g);

    if (this.zipcode.length === 8) {
      axios.get(`viacep.com.br/ws/${this.zipcode}/json/`)
        .then((res) => {
          if (res.data.erro) {
            return null;
          }
          return res.data;
        });
    }

    return null;
  }

  isValidCpf(cpf) {
    this.cpf = cpf.replace(/\D/g, '');

    if (!CPF.isValid(this.cpf)) {
      return null;
    }

    return this.cpf;
  }

  isValidCnpj() {

  }
}

module.exports = new Validation();
