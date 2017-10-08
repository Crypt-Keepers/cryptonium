import helpers from '../helpers/api-helpers';

const parseData = arr => (
  arr.sort((a, b) => {
    const dateA = new Date(a.published_at);
    const dateB = new Date(b.published_at);
    if (dateA - dateB > 0) {
      return -1;
    }
    if (dateA - dateB < 0) {
      return 1;
    }
    return 0;
  })
);

export function newsHasErrored(bool) {
  return {
    type: 'NEWS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function newsTrendingFetchDataSuccess(news) {
  return {
    type: 'NEWS_TRENDING_FETCH_DATA_SUCCESS',
    news,
  };
}

export function newsCoinFetchDataSuccess(coin, news) {
  return {
    type: 'NEWS_COIN_FETCH_DATA_SUCCESS',
    payload: { coin, news },
  };
}

export function newsFetchTrending() {
  return (dispatch) => {
    helpers.getTrendingNews()
      .then(data => (
        dispatch(newsTrendingFetchDataSuccess(parseData(data.results)))
      ))
      .catch(() => {
        dispatch(newsHasErrored(true));
      });
  };
}

export function changeNewsSelection(selection) {
  return {
    type: 'CHANGE_NEWS_SELECTION',
    payload: { selection },
  };
}

export function newsFetchCoin(coin) {
  return (dispatch) => {
    helpers.getCoinNews(coin)
      .then(data => (
        dispatch(newsCoinFetchDataSuccess(coin, parseData(data.results)))
      ))
      .catch(() => {
        dispatch(newsHasErrored(true));
      });
  };
}
