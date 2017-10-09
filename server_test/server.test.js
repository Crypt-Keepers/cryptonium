
const expect = require('chai').expect;
const server = require('../server/index.js');
const supertest = require('supertest');
const request = supertest.agent(server);

describe('server', function() {
  describe('GET /range', function() {
    it('should return an array of time series data', function(done) {
      request
        .get('/range')
        .expect(200)
      done();
    });
  });

});
