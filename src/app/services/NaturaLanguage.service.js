class NaturalLanguage {
  process(question, array) {
    const originalQuestion = question.toString().trim();
    let findInput = 0;
    let findIndex = 0;

    const documents = getDocuments(originalQuestion);

    if (documents) {
      return [{
        input: originalQuestion,
        ouput: 'Ok! Entendido...',
      }];
    }


    for (let i = 0; i < array.length; i++) {
      question = question ? question.toString()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .toLowerCase()
        : '';

      let input = array[i].input ? array[i].input.toString().trim()
        : array[i].output.toString().trim();

      input = input.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .toLowerCase();

      let tokenizationQuestion = question.split('');
      let tokenizationInput = input.split('');

      tokenizationQuestion = tokenizationQuestion.map((e) => {
        if (e.length > 3) {
          return e.substr(0, e.length - 3);
        }

        return e;
      });

      tokenizationInput = tokenizationInput.map((e) => {
        if (e.length > 3) {
          return e.substr(0, e.length - 3);
        }

        return e;
      });

      let words = 0;

      for (let x = 0; x < tokenizationQuestion.length; x++) {
        if (tokenizationInput.indexOf(tokenizationQuestion[x]) >= 0) {
          words++;
        }
      }

      if (words > findInput) {
        findInput = words;
        findIndex = i;
      }
    }

    if (findInput > 0) {
      return [{
        _id: array[findIndex]._id,
        client_id: array[findIndex].client_id,
        input: originalQuestion,
        output: array[findIndex].output,
      }];
    }

    return [{
      client_id: array[findIndex].client_id,
      input: originalQuestion,
      output: 'Desculpe, mas não sei te responder',
    }];
  }
}

module.exports = new NaturalLanguage();
