const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { currency } = req.query;

    models.search.getCryptopanicNews(currency)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(404).send();
        throw err;
      });
  },
};
