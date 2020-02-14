const { Router } = require('express')

const app = new Router()

const LeadController = require('./app/controllers/LeadController')

app.post('/get-lead', LeadController.store)

module.exports = app