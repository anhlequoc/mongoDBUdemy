const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver'); //dùng cách này để tránh lỗi khi work với mocha 

describe('Test Driver controller', () => {
  it('should post to /api/drivers/ create a new driver', (done) => {
    Driver.count().then(count => {
      request(app)
      .post('/api/drivers') 
      .send({ email: 'test@test.com' }) //request đc send ở dòng ngay trên, .send customize request này bằng cách thêm object vào
      .end(() => {
        Driver.count().then(newCount => {
          assert(count + 1 === newCount);
          done();
        });
      });
    });    
  });

  it('should put to /api/drivers/:driverId edit an existing driver', (done) => {
    //create a driver
    const driver = new Driver({ email: 't@t.com', isDriving: false });
    
    driver.save().then(() => {
      request(app)
        .put('/api/drivers/' + driver._id) //es6: `/api/drivers/${driver._id}`
        .send({ isDriving: true }) //edit driver
        .end(() => {
          Driver.findOne({ email: 't@t.com' })
            .then(driver => {
              assert(driver.isDriving === true);
              done();
            });
          });
      });
  });

  it('should delete to /api/drivers/:driverId delete an existing driver', done => {
    const driver = new Driver({ email: 'a@b.com' });

    driver.save().then(() => {
      request(app)
        .delete('/api/drivers/' + driver._id)
        .end(() => {
          Driver.findOne({ email: 'a@b.com' })
            .then((driver) => {
              assert(driver === null);
              done();
            });
        });
    });
  });

});