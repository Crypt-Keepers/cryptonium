import React from 'react';
import Search from './Search';
import DataDisplay from './DataDisplay';
import Panel from './Panel';
import News from './News';
import dummyData from '../data.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dummyData,
      curCoin: '',
      list: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(coin, isAdded = true) {
    let newString = `${this.state.curCoin} ${coin.toLowerCase().trim()}`;
    if (!isAdded) {
      const re = new RegExp(coin, 'gi');
      newString = newString.replace(re, '');
    }
    this.setState({ curCoin: newString.trim() });
  }

  render() {
    return (
      <div>
        <Search onSearch={this.handleSearch} />
        <DataDisplay data={this.state.data} />
        <Panel />
        <News coin={this.state.curCoin} list={this.state.list} />
      </div>
    );
  }
}
