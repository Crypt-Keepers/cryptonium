const models = require('../models');

module.exports = {
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
};
