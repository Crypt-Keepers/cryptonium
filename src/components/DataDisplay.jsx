import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import coinData from '../coin-data';

const propTypes = {
  coin: PropTypes.string,
};

const defaultProps = {
  coin: '',
};

class DataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinData: [],
    };
    this.setData = this.setData.bind(this);
    this.renderTimeSeriesData = this.renderTimeSeriesData.bind(this);
  }

  componentDidMount() {
    this.setData(this.props.coin);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coin !== nextProps.coin) {
      this.setData(nextProps.coin);
    }
  }

  setData(newCoin) {
    const coinArr = (newCoin.length) ? newCoin.split(' ') : ['bitcoin', 'etherium', 'litecoin'];
    let dataArr = [];
    coinArr.forEach((coin) => {
      if (coinData[coin]) {
        dataArr.push(coinData[coin]);
      }
    });
    this.setState({ coinData: dataArr }, () => this.renderTimeSeriesData(this.state.coinData[0]));
  }

  renderTimeSeriesData(coinData) {
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
    coinData.map((row) => {
      data.push({ time: new Date(row[0] * 1000), close: row[4] });
    });

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
  }

  render() {
    return (
      <div>DataDisplay
        <div id="data-display"></div>
        <button>1D</button>
        <button>1W</button>
        <button>1M</button>
        <button>1Y</button>
      </div>
    );
  }
}

DataDisplay.propTypes = propTypes;
DataDisplay.defaultProps = defaultProps;

export default DataDisplay;
