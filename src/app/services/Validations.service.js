const _ = require('lodash');
const CEP = require('cep-promise');
const axios = require('axios');
const CPF = require('@fnando/cpf/commonjs');
const CNPJ = require('@fnando/cnpj/commonjs');

const Lead = require('../schemas/Lead');

class Validation {
  async getDocuments(question = '') {
    this.question = question.toString().trim();
    const documents = {};

    const questionTokens = question.split(' ');

    for (let i = 0; i < questionTokens.length; i++) {
      const word = questionTokens[i].toString().trim();

      if (word.length > 1) {
        if (!documents.email) documents.email = this.isValidEmail(word);
        if (!documents.mobile_phone) documents.mobile_phone = this.isValidMobilePhone(word);
        if (!documents.phone) documents.phone = this.isValidPhone(word);
        if (!documents.cep) documents.cep = this.isValidCep(word);
        if (!documents.cpf) documents.cpf = this.isValidCpf(word);
        if (!documents.cnpj) documents.cnpj = this.isValidCnpj(word);
      }
    }

    if (documents.cep) {
      documents.address = await this.searchCep(documents.cep);
    }

    console.log(documents);
    if (_.isEmpty(documents)) {
      return false;
    }

    await Lead.create(documents);


    return true;
  }

  isValidEmail(email) {
    this.email = email.replace(/[^0-9a-zA-Z@.-_]/g, '');

    if (this.email < 7) {
      return '';
    }

    if (this.email.indexOf('@') > 0 && (this.email.indexOf('.') > 0)) {
      return this.email;
    }

    return '';
  }

  isValidMobilePhone(mobile_phone) {
    this.mobile_phone = mobile_phone.replace(/[^0-9]/g);

    if (this.mobile_phone.indexOf('55' === 0)) {
      this.mobile_phone = this.mobile_phone.replace('55', '');
    }

    if (this.isValidCpf(this.mobile_phone)) {
      return '';
    }

    if (this.mobile_phone.length === 11 && this.mobile_phone.indexOf('9') === 2) {
      return this.mobile_phone;
    }

    return '';
  }

  isValidPhone(phone) {
    this.phone = phone.replace(/[^0-9]/g);

    if (this.phone.indexOf('55' === 0)) {
      this.phone = this.phone.replace('55', '');
    }

    if (this.phone.length === 10) {
      return this.phone;
    }

    return '';
  }

  isValidCep(cep) {
    this.cep = cep.replace(/[^0-9]/g);
    if (this.cep.length === 8) {
      return this.cep;
    }

    return '';
  }

  async searchCep(cep) {
    this.cep = cep.replace(/[^0-9]/g);

    if (this.cep.length === 8) {
      this.res = await CEP(this.cep)
        .catch(console.log);

      if (this.res.errors) {
        return '';
      }

      return this.res;
    }

    return '';
  }

  isValidCpf(cpf) {
    this.cpf = cpf.replace(/\D/g, '');

    if (!CPF.isValid(this.cpf)) {
      return '';
    }

    return this.cpf;
  }

  isValidCnpj(cnpj) {
    this.cnpj = cnpj.replace(/\D/g, '');

    if (!CNPJ.isValid(this.cnpj)) {
      return '';
    }

    return this.cnpj;
  }
}

module.exports = new Validation();
