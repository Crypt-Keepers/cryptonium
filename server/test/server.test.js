const supertest = require('supertest');
const mongoose = require('mongoose');

process.env.MONGODB_URI = 'mongodb://localhost:27017/cryptonium-test';

const server = require('../index.js');

const request = supertest.agent(server);


/**
 * Cryptonoium Server tests
 */
describe('Cryptonoium Server tests', () => {
  /**
   * runs before all tests in this block
   */
  before((done) => {
    mongoose.connect(process.env.MONGODB_URI);
    done();
  });

  /**
   * runs after all tests in this block
   */
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  /**
   * runs before each test in this block
   */
  beforeEach(() => {
  });

  /**
   * runs after each test in this block
   */
  afterEach(() => {
  });

  /**
   * Cryptonoium /user GET and POST tests
   */
  describe('Cryptonoium /user GET and POST tests', () => {
    it('Should create user if user does not exist', (done) => {
      request
        .get('/user?username=foo')
        .expect(201, done);
    });

    it('Should get user details if user exist', (done) => {
      request
        .get('/user?username=bar')
        .expect(201, () => {
          request.get('/user?username=bar')
            .expect(200, done);
        });
    });

    it('Should post user details', (done) => {
      request
        .post('/user')
        .field('username', 'foo')
        .field('coin', 'ETH')
        .field('quantity', 100)
        .expect(201, done);
    });
  });

  /**
   * Cryptonoium /search GET tests
   */
  describe('Cryptonoium /search GET tests', () => {
    it('Should get news search for specific currency', (done) => {
      request
        .get('/search?currency=ETH')
        .expect(200, done);
    });

    it('Should get news search for all currencies', (done) => {
      request
        .get('/search')
        .expect(200, done);
    });

    it('Should get news search for invalid currency', (done) => {
      request
        .get('/search?currency=foo')
        .expect(404, done);
    });
  });

  /**
   * Cryptonoium /range GET tests
   * @type {String}
   */
  describe('Cryptonoium Range tests', () => {
    it('Should get range data for specific coin, an array of time series data', (done) => {
      request
        .get('/range?coin=BTC&dateStart=1507489906442&dateEnd=1507576306442&granularity=432000')
        .expect(200, done);
    });

    xit('Should get range details');

    it('Should result in error for invalid range request', (done) => {
      request
        .get('/range')
        .expect(404, done);
    });
  });
});
