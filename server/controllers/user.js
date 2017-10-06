const db = require('../db/index.js');

module.exports = {
  get: (req, res) => {
    const { username } = req.query;

    db.User.findOne({ username })
      .then((data) => {
        res.status(200).send(data || db.User.create({ username }));
      })
      .then(res.sendStatus(200));
  },
  post: (req, res) => {
    const { username, coin, quantity } = req.body;

    db.updatePosition(username, coin, Number(quantity))
      .then(res.sendStatus(201));
  },
};
