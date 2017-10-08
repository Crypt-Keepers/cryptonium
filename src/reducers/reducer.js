export function coin(state = 'Bitcoin', action) {
  switch (action.type) {
    case 'CHANGE_COIN':
      return action.payload.coin;
    default:
      return state;
  }
}

export function username(state = '', action) {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return action.payload.username;
    default:
      return state;
  }
}

export function newsHasErrored(state = false, action) {
  switch (action.type) {
    case 'NEWS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function newsTrending(state = [], action) {
  switch (action.type) {
    case 'NEWS_TRENDING_FETCH_DATA_SUCCESS':
      return action.news;
    default:
      return state;
  }
}

export function newsSelect(state = 'trending', action) {
  switch (action.type) {
    case 'CHANGE_NEWS_SELECTION':
      return action.payload.selection;
    default:
      return state;
  }
}

export function newsCoin(state = {}, action) {
  switch (action.type) {
    case 'NEWS_COIN_FETCH_DATA_SUCCESS':
      return Object.assign({}, state, { [action.payload.coin]: action.payload.news });
    default:
      return state;
  }
}

export function panelSelect(state = 'overview', action) {
  switch (action.type) {
    case 'CHANGE_PANEL_SELECTION':
      return action.payload.selection;
    default:
      return state;
  }
}

export function tickerData(state = {}, action) {
  switch (action.type) {
    case 'TICKER_FETCH_DATA_SUCCESS': {
      const newObj = {};
      action.tickerData.forEach((item) => {
        newObj[item.coin] = item.data;
      });
      return Object.assign({}, state, newObj);
    }
    default:
      return state;
  }
}

export function userData(state = {}, action) {
  switch (action.type) {
    case 'USER_DB_GET_SUCCESS': {
      return Object.assign({}, state, action.userData);
    }
    default:
      return state;
  }
}
