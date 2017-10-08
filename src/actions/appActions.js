export function changeCoin(coin) {
  return {
    type: 'CHANGE_COIN',
    payload: {
      coin,
    },
  };
}

export function changeUsername(username) {
  return {
    type: 'CHANGE_USERNAME',
    payload: {
      username,
    },
  };
}
