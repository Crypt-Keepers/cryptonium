const Promise = require('bluebird');

module.exports = {
  get: () => {
    let dummyData = 'User';
    return new Promise((resolve, reject) => {
      resolve(dummyData);
    });
  },
};
