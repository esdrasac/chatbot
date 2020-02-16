const { Router } = require('express');

const app = new Router();

const authMiddleware = require('./app/middlewares/auth');
const LeadController = require('./app/controllers/LeadController');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const DataController = require('./app/controllers/DataController');

app.post('/users', UserController.store);
app.post('/sessions', SessionController.store);

app.use(authMiddleware);
app.put('/users', UserController.update);

app.get('/data', DataController.index);
app.post('/data', DataController.store);
app.post('/find-data', DataController.show);
app.put('/data/:id', DataController.update);

app.delete('/data/:id', DataController.delete);


app.post('/get-lead', LeadController.store);


module.exports = app;
