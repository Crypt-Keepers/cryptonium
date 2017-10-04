import Model from '../model-view';
import bluebird from 'bluebird';
import $ from 'jquery';
import coinData from '../coin-data';

const test = (model) => {
  model.data = JSON.stringify(['HI']);
  console.log('model.data is', model.data);
  return model;
};

const helpers = {
  test,
};

const getRangeData = (coinName, range) => {
  const translateCoin = { bitcoin: 'BTC', etherium: 'ETH', litecoin: 'LTC' };
  const coin = translateCoin[coinName];

  // range in milliseconds
  const getRange = { '1D': 86400000, '1W': 604800000, '1M': 2592000000, '1Y': 31536000000 };
  const now = new Date();
  const dateEnd = now.getTime();
  const dateStart = dateEnd - getRange[range];
  const granularity = getRange[range] / 200; // GDAX takes 200 datapoints max

  return new Promise((resolve, reject) => {
    resolve(coinData[coinName]);

    // Actual AJAX call test is waiting until routes are done
    // $.ajax({
    //   url: '/range',
    //   data: { coin, dateStart, dateEnd, granularity },
    // }).done((data) => {
    //   resolve(data);
    // }).fail((error) => {
    //   reject(error);
    // });
  });
};

export default { getRangeData };

