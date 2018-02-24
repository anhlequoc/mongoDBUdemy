const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); //routes will be a function as defined in its module file

//app is object to take incoming requests and distribute them
const app = express();

//connect with db
mongoose.Promise = global.Promise; //see lecture 110 - 111

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

//use body-parser middleware to handle requests from client
app.use(bodyParser.json());
routes(app);

//use middleware which is mentioned in lectured 117 - place it after routes(app) line above
app.use((err, req, res, next) => { //register anytype of middleware in express by this command
/*
  - err: object contain error
  - req & res: request and response obj
  - next: is a function to call next middleware
*/
  res.status(422).send({ error: err.message }); //set status code to 422 then send error message to client
});

//request handler for POST request
//app.post('')

module.exports = app;