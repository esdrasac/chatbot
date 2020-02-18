const Data = require('../schemas/Data');
const authConfig = require('../../config/auth');
const NaturalLaguage = require('../services/NaturaLaguage.service');

class QuestionController {
  async show(req, res) {
    let result = 0;

    const dataObj = {
      input: req.query.input,
      client_id: authConfig.client_id,
    };

    let data = await Data.find(dataObj);

    if (data.length === 0) {
      result = await Data.find({ client_id: authConfig.client_id });

      data = NaturalLaguage.process(dataObj.input, result);
    }
    return res.json(data);
  }
}

module.exports = new QuestionController();
