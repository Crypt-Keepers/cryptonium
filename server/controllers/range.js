const models = require('../models');

module.exports = {
  get: (req, res) => {
    let { coin, dateStart, dateEnd, granularity } = req.query;
    granularity /= 1000;
    dateStart = Number(dateStart);
    dateEnd = Number(dateEnd);

    models.range.getTimeSeriesByRange(coin, dateStart, dateEnd, granularity)
      .then((series) => {
        res.json(series);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(404);
      });
  },
};
