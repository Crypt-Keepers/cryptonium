import Model from '../model-view';
import Promise from 'bluebird';
import $ from 'jquery';

const translateCoin = { bitcoin: 'BTC', etherium: 'ETH', litecoin: 'LTC' };

const getRangeData = (coinName, range) => {
  const coin = translateCoin[coinName];
  // range in milliseconds
  const getRange = { '1D': 86400000, '1W': 604800000, '1M': 2592000000, '1Y': 31536000000 };
  const now = new Date();
  const dateEnd = now.getTime();
  const dateStart = dateEnd - getRange[range];
  const granularity = getRange[range] / 200; // GDAX takes 200 datapoints max

  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/range',
      data: { coin, dateStart, dateEnd, granularity }, // send all time-data in milliseconds
    }).done((data) => {
      resolve(data);
    }).fail((error) => {
      reject(error);
    });
  });
};

const getTrendingNews = () => (
  new Promise((resolve, reject) => {
    $.ajax({
      url: '/search',
      method: 'GET',
      success: (data) => {
        resolve(data);
      },
      error: (err) => {
        reject(err);
      },
    });
  })
);

const getCoinData = (coin) => {
  const coinSymbol = translateCoin[coin];
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/search',
      method: 'GET',
      data: { currency: coinSymbol },
      success: (data) => {
        resolve(data);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

const getTickerData = () => {
  const coins = ['BTC', 'ETH', 'LTC'];
  const coinsArr = [];
  coins.forEach((coin) => {
    coinsArr.push(new Promise((resolve, reject) => {
      $.ajax({
        url: '/ticker',
        data: { coin },
      }).done((data) => {
        resolve({ coin, data });
      }).fail((error) => {
        reject(error);
      });
    }));
  });

  return Promise.all(coinsArr);
};

export default { getRangeData, getTrendingNews, getCoinData, getTickerData };
