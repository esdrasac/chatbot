const { Router } = require('express');

const app = new Router();

const LeadController = require('./app/controllers/LeadController');
const UserController = require('./app/controllers/UserController');

app.post('/users', UserController.store);

app.post('/get-lead', LeadController.store);


module.exports = app;
