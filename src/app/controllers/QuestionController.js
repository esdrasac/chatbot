const Data = require('../schemas/Data');
const authConfig = require('../../config/auth');
const NaturalLanguage = require('../services/NaturaLanguage.service');

class QuestionController {
  async show(req, res) {
    let result;

    const { input, code_before } = req.query;

    const dataObj = {
      client_id: authConfig.client_id,
      input,
    };

    let data = await Data.find(dataObj);

    if (!data.length) {
      if (req.query.code_before) {
        result = await Data.find({
          client_id: authConfig.client_id,
          code_relation: code_before,
        });
        if (!result) {
          result = await Data.find({ client_id: authConfig.client_id });
          data = NaturalLanguage.process(dataObj.input, result);
        }
      } else {
        result = await Data.find({ client_id: authConfig.client_id });
      }

      data = await NaturalLanguage.process(dataObj.input, result);
    }
    return res.json(data);
  }
}

module.exports = new QuestionController();
