import { combineReducers } from 'redux';
import {
  coin,
  username,
  newsHasErrored,
  newsTrending,
  newsSelect,
  newsCoin,
  panelSelect,
  tickerData,
  userData,
} from './reducer';

export default combineReducers({
  coin,
  username,
  newsHasErrored,
  newsTrending,
  newsSelect,
  newsCoin,
  panelSelect,
  tickerData,
  userData,
});
