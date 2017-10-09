const request = require('request');
const CONSTANTS = require('../constants');

module.exports = {
  search: {
    get: (currency) => {
      const options = {
        method: 'GET',
        uri: CONSTANTS.CRYPTOPANIC_URI,
        qs: {
          auth_token: CONSTANTS.AUTH_TOKEN,
          currency,
        },
        headers: { 'User-Agent': 'cryptonium' },
        json: true,
      };

      return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
          if (response.statusCode === 200) {
            resolve(body);
          } else {
            reject(error || 'Invalid Currency');
          }
        });
      });
    },
  },
};
