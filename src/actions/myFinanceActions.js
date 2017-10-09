import helpers from '../helpers/api-helpers';

export function dbHasErrored(bool) {
  return {
    type: 'USER_DB_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function dbGetSuccess(userData) {
  return {
    type: 'USER_DB_GET_SUCCESS',
    userData,
  };
}

export function getUserData(username) {
  return dispatch => (
    helpers.getUserData(username)
      .then(data => (
        dispatch(dbGetSuccess(data))
      ))
      .catch(() => (
        dispatch(dbHasErrored(true))
      ))
  );
}

export function updateUserData(username, coin, quantity) {
  return (dispatch) => {
    helpers.postUserData(username, coin, quantity)
      .then(() => (
        dispatch(getUserData(username))
      ))
      .catch(() => (
        dispatch(dbHasErrored(true))
      ));
  };
}
