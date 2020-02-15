const { Router } = require('express');

const app = new Router();

const authMiddleware = require('./app/middlewares/auth');
const LeadController = require('./app/controllers/LeadController');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

app.post('/users', UserController.store);
app.post('/sessions', SessionController.store);

app.use(authMiddleware);
app.put('/users', UserController.update);


app.post('/get-lead', LeadController.store);


module.exports = app;
