const Yup = require('yup');

const Data = require('../schemas/Data');
const User = require('../models/User');

class DataController {
  async index(req, res) {
    const { page } = req.query;

    const data = await Data.find({ client_id: req.client_id }).skip((page - 1) * 20).limit(20);

    return res.json(data);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string(),
      input: Yup.string(),
      output: Yup.string(),
    });

    if (!(schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    req.body.client_id = req.client_id;

    const data = await Data.find(req.body);
    return res.json(data);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      code_relation: Yup.string(),
      input: Yup.string(),
      output: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { input, output, code_relation } = req.body;

    const data = await Data.create({
      client_id: req.client_id,
      code_relation,
      user_id: req.userId,
      input,
      output,
    });

    return res.json(data);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      input: Yup.string(),
      output: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(401).json({ error: 'Cannot find data' });
    }

    if (data.client_id !== req.client_id) {
      return res.status(401).json('You do not have permission');
    }

    await data.updateOne(req.body);


    return res.json(req.body);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    const { permissions } = user;

    const data = await Data.findById(req.params.id);

    if (!data) {
      res.status(401).json({ error: 'Can not find data' });
    }

    if (permissions !== 'admin' || data.client_id !== req.client_id) {
      return res.status().json({ error: 'You do not have permission to delete' });
    }

    await Data.delete(req.params.id);

    return res.json(data);
  }
}

module.exports = new DataController();
