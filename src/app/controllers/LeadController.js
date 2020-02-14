const Yup = require('yup')

const Lead = require('../models/Lead')

class LeadController{
    async store(req, res){
        const schema = Yup.object().shape({
            name: Yup.string()
                .lowercase()
                .trim()
                .matches(/(' ')/),
            email: Yup.string(),
            phone: Yup.string(),
            cpf: Yup.string(),
            address: {
                zipcode: Yup.string(),
                street: Yup.string()
                    .lowercase(),
                number: Yup.integer()
                    .positive(),
                neighborhood: Yup.string()
                .lowercase(),
                city: Yup.string()
                    .lowercase(),
                state: Yup.string()
                    .lowercase(),

            }
        })

        return res.json({ok: true})
    }
}

module.exports = new LeadController()