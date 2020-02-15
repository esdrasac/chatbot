const Yup = require('yup');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      mail: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { mail, password } = req.body;

    const userExists = await User.findOne({ where: { mail } });

    if (!userExists) {
      return res.status(401).json({ error: 'Can not find user' });
    }

    if (!(await userExists.checkPassword(password))) {
      return res.status().json({ error: 'Password not match' });
    }

    const { id, name } = userExists;

    return res.json({
      id,
      name,
      mail,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
