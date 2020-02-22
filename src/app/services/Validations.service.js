class Validation {
  getDocuments(question = '') {
    this.question = question.toString().trim();
    const documents = {};

    const name = this.getName();
    const age = this.getAge();

    if (name) documents.name = name;
    if (age) documents.age = age;

    const questionTokens = question.split('');

    for (let i = 0; i < questionTokens.length; i++) {
      const word = questionTokens[i].toString().trim();

      if (word.length > 1) {
        if (!documents.email) documents.email = this.isValidEmail();
        if (!documents.mobile_Phone) documents.mobile_Phone = this.isValidMobilePhone();
        if (!documents.phone) documents.phone = this.isValidPhone();
        if (!documents.zipcode) documents.zipcode = this.isValidZipcode();
        if (!documents.cpf) documents.cpf = this.isValidCpf();
        if (!documents.cnpj) documents.cnpj = this.isValidCnpj();
      }
    }
  }


  getName() {

  }

  getAge() {

  }

  isValidEmail() {

  }
}

module.exports = new Validation();
