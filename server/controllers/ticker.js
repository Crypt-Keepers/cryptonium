const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { coin } = req.query;

    models.ticker.getTickerData(coin)
      .then((ticker) => {
        res.json(ticker);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(404);
      });
  },
};
