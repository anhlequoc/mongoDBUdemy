const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('should handle a GET request to /api', (done) => {
    //call request from supertest package
    request(app)
      .get('/api')
      .end((err, response) => {        
        assert(response.body.hi === "anh there");
        done();
      });
  });
});