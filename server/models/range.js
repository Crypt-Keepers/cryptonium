const gdax = require('../helpers/gdax');

module.exports = {
  getTimeSeriesByRange: (coin, dateStart, dateEnd, granularity) =>
    gdax.getTimeSeriesByRange(coin, dateStart, dateEnd, granularity),
};
