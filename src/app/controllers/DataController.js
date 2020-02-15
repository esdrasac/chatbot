const Yup = require('yup');

const Data = require('../schemas/Data');
const User = require('../models/User');

class DataController {
  async show(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string(),
      input: Yup.string(),
      output: Yup.string(),
    });

    if (!(schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const data = await Data.find(req.body);
    return res.json(data);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      input: Yup.string()
        .required(),
      output: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { userId, input, output } = req.body;

    const data = await Data.create({
      userId,
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

    await data.updateOne(req.body);


    return res.json(req.body);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    const { permissions } = user;

    if (permissions !== 'admin') {
      return res.status().json({ error: 'You do not have permission to delete' });
    }

    const data = await Data.findByIdAndDelete(req.params.id);


    return res.json(data);
  }
}

module.exports = new DataController();
