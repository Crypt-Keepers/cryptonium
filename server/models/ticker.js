const gdax = require('../helpers/gdax');

module.exports = {
  getTickerData: coin => gdax.getTickerData(coin),
};
