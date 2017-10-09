import React from 'react';
import PropTypes from 'prop-types';
import tickerData from '../ticker-data';

const propTypes = {
  coin: PropTypes.string,
};

const defaultProps = {
  coin: '',
};

const Trending = props => {

  return (
    <div>Trending and Pie Chart!
      <div>{props.coin}</div>
    </div>
  );
};

Trending.propTypes = propTypes;
Trending.defaultProps = defaultProps;

export default Trending;
