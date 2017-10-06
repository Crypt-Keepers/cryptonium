const Promise = require('bluebird');

module.exports = {
  get: () => {
    let dummyData = 'List';
    return new Promise((resolve, reject) => {
      resolve(dummyData);
    });
  },
};
