const Data = require('../schemas/Data');

class QuestionController {
  async show(req, res) {
    this.result = null;

    if (!req.query.input) {
      req.query.input = '';
    }
    const dataObj = {
      input: req.query.input,
      client_id: req.client_id,
    };

    let data = await Data.find(dataObj);

    if (!data) {
      this.result = await Data.find({ client_id: req.client_id });

      data = nlp(dataObj.input, this.result);
    }
    return res.json(data);
  }
}

module.exports = new QuestionController();
