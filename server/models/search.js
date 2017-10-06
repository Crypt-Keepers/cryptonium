const cryptopanic = require('../helpers/cryptopanic');

module.exports = {
  getCryptopanicNews: coin => cryptopanic.getCryptopanicNews(coin),
};
