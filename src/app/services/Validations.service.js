const _ = require('lodash');
const CEP = require('cep-promise');
const CPF = require('@fnando/cpf/commonjs');
const CNPJ = require('@fnando/cnpj/commonjs');

const Lead = require('../schemas/Lead');

class Validation {
  async getDocuments(question = '') {
    this.question = question.toString().trim();
    const documents = {};
    const response = {};

    const questionTokens = question.split(' ');

    for (let i = 0; i < questionTokens.length; i++) {
      const word = questionTokens[i].toString().trim();

      const email = this.isValidEmail(word);
      const mPhone = this.isValidMobilePhone(word);
      const phone = this.isValidPhone(word);
      const cep = this.isValidCep(word);
      const cpf = this.isValidCpf(word);
      const cnpj = this.isValidCnpj(word);


      if (word.length > 1) {
        if (!documents.email && email !== null) documents.email = this.isValidEmail(word);
        if (!documents.mobile_phone && mPhone !== null) documents.mobile_phone = this.isValidMobilePhone(word);
        if (!documents.phone && phone !== null) documents.phone = this.isValidPhone(word);
        if (!documents.cep && cep !== null) documents.cep = this.isValidCep(word);
        if (!documents.cpf && cpf !== null) documents.cpf = this.isValidCpf(word);
        if (!documents.cnpj && cnpj !== null) documents.cnpj = this.isValidCnpj(word);
      }
    }

    if (documents.cep) {
      documents.address = await this.searchCep(documents.cep);
    }

    if (_.isEmpty(documents)) {
      return false;
    }

    await Lead.create(documents);


    return true;
  }

  isValidEmail(email) {
    this.email = email.replace(/[^0-9a-zA-Z@.-_]/g, '');

    if (this.email < 7) {
      return null;
    }

    if (this.email.indexOf('@') > 0 && (this.email.indexOf('.') > 0)) {
      return this.email;
    }

    return null;
  }

  isValidMobilePhone(mobile_phone) {
    this.mobile_phone = mobile_phone.replace(/[^0-9]/g);

    if (this.mobile_phone.indexOf('55' === 0)) {
      this.mobile_phone = this.mobile_phone.replace('55', '');
    }

    if (this.isValidCpf(this.mobile_phone)) {
      return null;
    }

    if (this.mobile_phone.length === 11 && this.mobile_phone.indexOf('9') === 2) {
      return this.mobile_phone;
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

  isValidCep(cep) {
    this.cep = cep.replace(/[^0-9]/g);
    if (this.cep.length === 8) {
      return this.cep;
    }

    return null;
  }

  async searchCep(cep) {
    this.cep = cep.replace(/[^0-9]/g);

    if (this.cep.length === 8) {
      this.res = await CEP(this.cep)
        .catch(console.log);

      if (this.res.errors) {
        return null;
      }

      return this.res;
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

  isValidCnpj(cnpj) {
    this.cnpj = cnpj.replace(/\D/g, '');

    if (!CNPJ.isValid(this.cnpj)) {
      return null;
    }

    return this.cnpj;
  }
}

module.exports = new Validation();
