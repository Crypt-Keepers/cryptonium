import React from 'react';
import PropTypes from 'prop-types';
// import tickerData from '../ticker-data';
import helpers from '../helpers/api-helpers';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC: {},
      LTC: {},
      ETH: {},
    };
  }

  componentDidMount() {
    helpers.getTickerData()
      .then((tickerData) => {
        tickerData.forEach((coinObj) => {
          this.setState({ [coinObj.coin]: coinObj.data });
        });
      });
  }

  render() {
    return (
      <div>Coin Overview
        <div className="coin-item" onClick={() => {this.props.handleClick('bitcoin')}}>
          Bitcoin
          <div>Price: {this.state.BTC ? this.state.BTC.price : ''}</div>
        </div>
        <div className="coin-item" onClick={() => {this.props.handleClick('litecoin')}}>
          Litecoin
          <div>Price: {this.state.LTC ? this.state.LTC.price : ''}</div>
        </div>
        <div className="coin-item" onClick={() => {this.props.handleClick('etherium')}}>
          Etherium
          <div>Price: {this.state.ETH ? this.state.ETH.price : ''}</div>
        </div>
      </div>
    );
  }
}

export default Overview;
