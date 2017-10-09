const models = require('../models');
const gdax = require('../../helpers/gdax.js');
const db = require('../db/index.js');

module.exports = {
  range: {
    get: (req, res) => {
      let { coin, dateStart, dateEnd, granularity } = req.query;
      try {
        granularity /= 1000;
        dateStart = Number(dateStart);
        dateEnd = Number(dateEnd);
        gdax.getTimeSeriesByRange(coin, dateStart, dateEnd, granularity)
          .then((series) => {
            res.json(series);
          })
          .catch((err) => {
            res.sendStatus(404);
            // console.error(err);
          });
      } catch (e) {
        res.sendStatus(404);
        // console.error(e);
      }
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
          res.sendStatus(404);
          console.error(err);
        });
    },
  },
  search: {
    get: (req, res) => {
      const { currency } = req.query;

      models.search.get(currency)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
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
              .then(newData => res.status(201).send(newData));
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
