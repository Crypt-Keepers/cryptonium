import React from 'react';
import dummyData from './data.json';

class Model {
  constructor() {
    this._data = JSON.stringify(dummyData);
  }

  set data(newData) {
    this._data = newData;
  }

  get data() {
    return this._data;
  }

}

export default new Model();
