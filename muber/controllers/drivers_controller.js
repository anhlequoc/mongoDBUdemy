//controller module in express
/*
By convention, will have controller for each type of resource we have in application:
  - todo resource -> should have todo controller
  - book resource -> should have book controller
*/

const Driver = require('../models/driver');

//object: each key-value pair is an action with resource
module.exports = {
  //declare function of object, following es6 format, insteadd of greeting: function(req, res) {}
  greeting(req, res) {
    res.send({ hi: 'anh there' });
  },

  create(req, res, next) { //next để khi có lỗi -> chạy tiếp middleware tiếp theo
    //req.body đã được xử lý bởi body-parser
    const driverProps = req.body;
    
    Driver.create(driverProps) //func .create của mongoose
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.driverId; //driverId is same as driverId in routes.js
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.driverId;

    Driver.findOneAndRemove({ _id: driverId })
      .then(() => res.status(204).send({ _message: "remove successfully" }))
      .catch(next);
  }
};