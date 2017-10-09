export function changeCoin(coin) {
  return {
    type: 'CHANGE_COIN',
    payload: {
      coin,
    },
  };
}

export function modalIsOpen(bool) {
  return {
    type: 'MODAL_IS_OPEN',
    isOpen: bool,
  };
}
