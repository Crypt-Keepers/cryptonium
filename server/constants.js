const LOCAL_TOKEN = require('./config');

const AUTH_TOKEN = process.env.AUTH_TOKEN || LOCAL_TOKEN;
const CRYPTOPANIC_URI = 'https://cryptopanic.com/api/posts';

module.exports = {
  AUTH_TOKEN,
  CRYPTOPANIC_URI,
};
