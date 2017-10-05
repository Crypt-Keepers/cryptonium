import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';

const propTypes = {
  handleClick: PropTypes.func,
};

const defaultProps = {
  handleClick: e => (e),
};

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
        <div
          className="coin-item"
          onClick={() => { this.props.handleClick('bitcoin'); }}
          role="menuitem"
          tabIndex="0"
        >
          Bitcoin
          <div>
            Price: {this.state.BTC ? Number(this.state.BTC.price).toFixed(2) : ''}
          </div>
        </div>
        <div
          className="coin-item"
          onClick={() => { this.props.handleClick('litecoin'); }}
          role="menuitem"
          tabIndex="0"
        >
          Litecoin
          <div>
            Price: {this.state.LTC ? Number(this.state.LTC.price).toFixed(2) : ''}
          </div>
        </div>
        <div
          className="coin-item"
          onClick={() => { this.props.handleClick('etherium'); }}
          role="menuitem"
          tabIndex="0"
        >
          Etherium
          <div>
            Price: {this.state.ETH ? Number(this.state.ETH.price).toFixed(2) : ''}
          </div>
        </div>
      </div>
    );
  }
}

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

export default Overview;
