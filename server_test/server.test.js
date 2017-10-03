var expect = require('chai').expect;
var request = require('request');

var app = require('../server/index.js');
// var port = 4568;

//TODO: Fix me once schema is done.
// This is an example of how to clear Mongo schema before each test
// Good tutorial for MERN stack tests:
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
describe('List', () => {
  // beforeEach((done) => {
  //   List.remove({}, (err) => {
  //     done();
  //   });
  // });
  it ('should test', () => {
    expect(2 + 2).to.equal(4);
  });
});
