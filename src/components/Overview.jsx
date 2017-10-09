import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/overviewActions';
import { changeCoin } from '../actions/appActions';
<<<<<<< HEAD
=======
import helpers from '../helpers/api-helpers';
>>>>>>> (refactor) Add redux to panel, begin refactor for overview
import TableRow from './TableRow';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  tickerFetch: PropTypes.func.isRequired,
  tickerData: PropTypes.objectOf(PropTypes.object).isRequired,
};

const defaultProps = {
  handleClick: e => (e),
  className: '',
  tickerFetch: e => (e),
  tickerData: {},
};

class Overview extends React.Component {
  constructor(props) {
    super();

    props.tickerFetch();

    setInterval(() => {
      props.tickerFetch();
    }, 60000 * 3);
  }

  render() {
    const { tickerData } = this.props;
    const timeStr = tickerData.BTC ? tickerData.BTC.time : 0;

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
              coin={tickerData.BTC}
              name="BTC"
              onClick={() => { this.props.handleClick('Bitcoin'); }}
            />
            <TableRow
              coin={tickerData.LTC}
              name="LTC"
              onClick={() => { this.props.handleClick('Litecoin'); }}
            />
            <TableRow
              coin={tickerData.ETH}
              name="ETH"
              onClick={() => { this.props.handleClick('Ethereum'); }}
            />
          </tbody>
        </table>
        <div className="table-date">
          Last updated at {(new Date(timeStr)).toTimeString()}
        </div>
      </div>
    );
  }
}

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
<<<<<<< HEAD
=======
    // activeCoin: state.coin,
>>>>>>> (refactor) Add redux to panel, begin refactor for overview
    tickerData: state.tickerData,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    tickerFetch: actions.tickerFetch,
    handleClick: changeCoin,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
