import React from 'react';
import * as d3 from 'd3';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';

const propTypes = {
  activeCoin: PropTypes.string,
};

const defaultProps = {
  activeCoin: '',
};

const renderTimeSeriesData = (coinData) => {
  // clear svg before every render
  d3.selectAll('svg').remove();

  // svg / line graph settings, hardcoded, customizable
  const width = 600;
  const height = 400;
  const padding = 40;
  const xTicks = 6;
  const yTicks = 4;

  // extract time and close info from data
  const data = [];
  coinData.map(row => data.push({ time: new Date(row[0] * 1000), close: row[4] }));

  const svg = d3.select('#data-display')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // x range is set this way because data given reverse-chronologically
  const x = d3.scaleTime()
    .range([padding, (width - padding)]);

  const y = d3.scaleLinear()
    .range([(height - padding), padding]);

  // set x and y axis, use extend to calculate domain
  const xAxis = d3
    .axisBottom(x.domain(d3.extent(data, d => d.time)))
    .ticks(xTicks);
  const yAxis = d3
    .axisLeft(y.domain(d3.extent(data, d => d.close)))
    .ticks(yTicks);

  // generate line
  const line = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.close));

  // append everything
  svg.append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

  svg.append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

  svg.append('path')
    .data([data])
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('d', line);
};

class DataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinData: [],
      range: '1D',
      isLoading: false,
    };

    this.getRangeData = this.getRangeData.bind(this);
  }

  componentDidMount() {
    const coin = (this.props.activeCoin.length) ? this.props.activeCoin : 'bitcoin';
    this.getRangeData(coin, '1D');
    this.getRangeData = debounce(this.getRangeData.bind(this), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCoin !== nextProps.activeCoin) {
      const coin = (nextProps.activeCoin.length) ? nextProps.activeCoin : 'bitcoin';
      this.getRangeData(coin, this.state.range);
    }
  }

  getRangeData(coin, range) {
    this.spinner(true);
    helpers.getRangeData(coin, range)
      .then((coinData) => {
        this.setState({ coinData, range }, () => renderTimeSeriesData(this.state.coinData));
        this.spinner(false);
      });
  }

  spinner(isSpinning) {
    this.setState({ isLoading: isSpinning });
  }

  render() {
    const coinName = (this.props.activeCoin.length) ? this.props.activeCoin : 'bitcoin';

    return (
      <div className="data-display-container">
        Value of {coinName} in USD plotted over {this.state.range} range
        <div id="data-display"></div>
        <div className={this.state.isLoading ? 'data-overlay' : ''} />
        <div className={this.state.isLoading ? 'loader' : ''} />
        <button onClick={() => this.getRangeData(coinName, '1D')}>1D</button>
        <button onClick={() => this.getRangeData(coinName, '1W')}>1W</button>
        <button onClick={() => this.getRangeData(coinName, '1M')}>1M</button>
        <button onClick={() => this.getRangeData(coinName, '1Y')}>1Y</button>
      </div>
    );
  }
}

DataDisplay.propTypes = propTypes;
DataDisplay.defaultProps = defaultProps;

export default DataDisplay;
