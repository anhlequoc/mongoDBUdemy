//controller module in express
/*
By convention, will have controller for each type of resource we have in application:
  - todo resource -> should have todo controller
  - book resource -> should have book controller
*/

//object: each key-value pair is an action with resource
module.exports = {
  //declare function of object, following es6 format, insteadd of greeting: function(req, res) {}
  greeting(req, res) {
    res.send({hi: 'anh there'});
  }, 
};