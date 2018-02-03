//route module in express
const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  //Watch for incoming requests of method GET to the route http://localhost:3050/api
  //request handler for GET request
  app.get('/api', DriversController.greeting); //important! không invoke greeting function ở đây, chỉ pass hàm này vào như là 1 tham số, sẽ invoke nó sau
};