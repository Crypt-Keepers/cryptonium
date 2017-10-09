import helpers from '../helpers/api-helpers';

export function tickerHasErrored(bool) {
  return {
    type: 'TICKER_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function tickerFetchDataSuccess(tickerData) {
  return {
    type: 'TICKER_FETCH_DATA_SUCCESS',
    tickerData,
  };
}

export function tickerFetch() {
  return (dispatch) => {
    helpers.getTickerData()
      .then(data => (
        dispatch(tickerFetchDataSuccess(data))
      ))
      .catch(() => (
        dispatch(tickerHasErrored(true))
      ));
  };
}
