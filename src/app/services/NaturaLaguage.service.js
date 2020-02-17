class NaturalLaguage {
  process(question, array) {
    let originalQuestion = question? question.toString().trim() : ''
    let findInput = 0
    let findIndex = 0

    for(let i = 0; i < array.length; i++){
      question = question? question.toString().trim() : ''
      let input = array[i].input? array[i].input.toString().trim() : ''
    }
  }
}

module.exports = new NaturalLaguage();
