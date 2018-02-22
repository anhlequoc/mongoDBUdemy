const express = require('express');
const routes = require('./routes/routes'); //routes will be a function as defined in its module file

//app is object to take incoming requests and distribute them
const app = express();
routes(app);

//request handler for POST request
//app.post('')

module.exports = app;