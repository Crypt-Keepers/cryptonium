const rp = require('request-promise');
const CONFIG = require('../config');

const getCryptopanicNews = (coin) => {
  const options = {
    method: 'GET',
    uri: CONFIG.CRYPTOPANIC_URI,
    qs: {
      auth_token: CONFIG.AUTH_TOKEN,
      coin,
    },
    headers: { 'User-Agent': 'cryptonium' },
    json: true,
  };

  return rp(options)
    .then(news => news)
    .catch(err => console.error(err));
};

module.exports = {
  getCryptopanicNews,
};
