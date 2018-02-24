const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  isDriving: { //dùng để xác định driver có đang available hay không
    type: Boolean,
    default: false
  }, 
  //location: String
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;