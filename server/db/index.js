const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptonium';

mongoose.connect(MONGODB_URI);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  watchlist: Array,
});
const User = mongoose.model('User', userSchema);


// add coin to watchlist
const updateWatchList = (user, coin) => {
  return User.collection.findOneAndUpdate(
    { username: user },
    { $addToSet: { watchlist: coin } },
    { upsert: true, returnNewDocument: true }
  );
};

module.exports.User = User;
module.exports.updateWatchList = updateWatchList;
