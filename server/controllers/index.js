const models = require('../models');
const gdax = require('../../helpers/gdax.js');
const ta = require('../../helpers/techAnal.js');
const db = require('../db/index.js');

module.exports = {
  range: {
    get: (req, res) => {
      let { coin, dateStart, dateEnd, granularity } = req.query;
      granularity /= 1000;
      dateStart = Number(dateStart);
      dateEnd = Number(dateEnd);
      gdax.getTimeSeriesByRange(coin, dateStart, dateEnd, granularity)
        .then((series) => {
          // console.log(ta.sma(series));
          // console.log(ta.ema(series));
          // console.log(ta.bollinger(series));
          // console.log(ta.macd(series));

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
      const { coin } = req.query;
      gdax.getTickerData(coin)
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
      let { currency } = req.query; // get currency from req.query

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
      const { username } = req.query;
      db.User.findOne({ username })
        .then((data) => {
          if (data) {
            res.status(200).send(data);
          } else { // if username not found, create one, then fetch, then return
            db.User.create({ username })
              .then(() => db.User.findOne({ username }))
              .then(newData => res.status(200).send(newData));
          }
        });
    },
    post: (req, res) => {
      const { username, coin, quantity } = req.body;
      db.updatePosition(username, coin, Number(quantity))
        .then(res.sendStatus(201));
    },
  },

};
