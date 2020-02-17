const Data = require('../schemas/Data');
const NaturalLaguage = require('../services/NaturaLaguage.service')

class QuestionController {
  async show(req, res) {
    this.result = null;

    const dataObj = {
      input: req.query.input,
      client_id: req.client_id,
    };

    let data = await Data.find(dataObj);

    if (!data) {
      this.result = await Data.find({ client_id: req.client_id });

      data = NaturalLaguage.process(dataObj.input, this.result);
    }
    return res.json(data);
  }
}

module.exports = new QuestionController();
