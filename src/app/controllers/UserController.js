const Yup = require('yup');

const User = require('../models/User');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required(),
      mail: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const userExists = await User.findOne({ where: { mail: req.body.mail } });

    if (userExists) {
      return res.status(401).json('User already exists');
    }

    const {
      id, name, mail, permissions,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      mail,
      permissions,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      mail: Yup.string()
        .email(),
      oldPassword: Yup.string()
        .min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (
          oldPassword ? field.required() : field
        )),
      confirmPassword: Yup.string()
        .when('password', (password, field) => (
          password ? field.required()
            .oneOf([Yup.ref('password')]) : field
        )),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    return res.json();
  }
}

module.exports = new UserController();
