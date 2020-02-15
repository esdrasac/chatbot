const Yup = require('yup');

const Lead = require('../schemas/Lead');

class LeadController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .lowercase()
        .trim()
        .matches(/( )/, () => res.status(401).json({ error: 'Last name is require' })),
      email: Yup.string(),
      phone: Yup.string(),
      cpf: Yup.string(),
      address: Yup.object().shape(
        {
          zipcode: Yup.string(),
          street: Yup.string()
            .lowercase(),
          number: Yup.number()
            .positive(),
          neighborhood: Yup.string()
            .lowercase(),
          city: Yup.string()
            .lowercase(),
          state: Yup.string()
            .lowercase(),

        },
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json('Validation Fails');
    }

    await Lead.create(req.body);

    return res.json(req.body);
  }
}

module.exports = new LeadController();
