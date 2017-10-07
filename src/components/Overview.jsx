import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';
// import OverviewItem from './OverviewItem';
import TableRow from './TableRow';

const propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  handleClick: e => (e),
  className: '',
};

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC: {},
      LTC: {},
      ETH: {},
    };

    this.updateData = this.updateData.bind(this);

    // Update ticker data every 3 minutes.
    setInterval(() => {
      this.updateData();
    }, 60000 * 3);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    helpers.getTickerData()
      .then((tickerData) => {
        tickerData.forEach((coinObj) => {
          this.setState({ [coinObj.coin]: coinObj.data });
        });
      });
  }

  render() {
    return (
      <div className={`table-container ${this.props.className}`}>Click a coin to see data<br />
        <table>
          <tbody>
            <tr className="table-header">
              <th />
              <th>Price</th>
              <th>Bid</th>
              <th>Ask</th>
            </tr>
            <TableRow
              coin={this.state.BTC}
              name="BTC"
              onClick={() => { this.props.handleClick('Bitcoin'); }}
            />
            <TableRow
              coin={this.state.LTC}
              name="LTC"
              onClick={() => { this.props.handleClick('Litecoin'); }}
            />
            <TableRow
              coin={this.state.ETH}
              name="ETH"
              onClick={() => { this.props.handleClick('Ethereum'); }}
            />
          </tbody>
        </table>
        <div className="table-date">
          Last updated at {(new Date(this.state.BTC.time || 0)).toTimeString()}
        </div>
      </div>
    );
  }
}

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

export default Overview;
