const models = require('../models');
const gdax = require('../../helpers/gdax.js');
const db = require('../db/index.js')

module.exports = {
  range: {
    get: (req, res) => {
      let { coin, dateStart, dateEnd, granularity } = req.query;
      granularity /= 1000;
      dateStart = Number(dateStart);
      dateEnd = Number(dateEnd);
      gdax.getTimeSeriesByRange(coin, dateStart, dateEnd, granularity)
        .then((series) => {
          res.json(series);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        });
    },
  },
  ticker: {
    get: (req, res) => {
      gdax.getTickerData('BTC')
        .then((ticker) => {
          res.json(ticker);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        });
    },
  },
  search: {
    get: (req, res) => {
      let {currency} = req.query; // get currency from req.query

      models.search.get(currency)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
  },

  list: {
    get: (req, res) => {
      models.list.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {

    },
  },

  user: {
    get: (req, res) => {
      models.user.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      const { username, coin, quantity } = req.body;
      db.updateWatchList(username, coin, quantity)
        .then(res.sendStatus(201));
    },
  },

};
