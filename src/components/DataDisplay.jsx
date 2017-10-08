import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import helpers from '../helpers/api-helpers';

const propTypes = {
  activeCoin: PropTypes.string.isRequired,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
};

const coinColor = {
  Bitcoin: '#D3D4D9',
  Ethereum: '#B95F89',
  Litecoin: '#4B88A2',
};

const renderTimeSeriesData = (coin, coinData) => {
  // clear svg before every render
  d3.select('#data-display').selectAll('svg').remove();

  // svg / line graph settings, hardcoded, customizable
  const width = 640;
  const height = 400;
  const padding = 60;
  const xTicks = 7;
  const yTicks = 5;

  // extract time and close info from data
  // reverse data which is given reverse-chronologically
  const data = [];
  coinData.reverse().forEach((row) => {
    data.push({ time: new Date(row[0] * 1000), close: row[4] });
  });

  const svg = d3.select('#data-display')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const x = d3.scaleTime()
    .range([padding, (width - padding)]);
  const y = d3.scaleLinear()
    .range([(height - padding), padding]);

  // set x and y domain
  const xDom = d3.extent(data, d => d.time);
  const yDom = d3.extent(data, d => d.close);

  // set x and y axis, use extend to calculate domain
  const xAxis = d3
    .axisBottom(x.domain(xDom))
    .ticks(xTicks);
  const yAxis = d3
    .axisLeft(y.domain(yDom))
    .ticks(yTicks);

  // generate initial flat line
  const flatLine = d3.line()
    .x(d => x(d.time))
    .y(() => y(yDom[0]));

  // generate data line
  const dataLine = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.close));

  // APPEND EVERYTHING
  // x-axis with ticks
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

  // x-axis label
  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${width / 2},${height - (padding / 4)})`)
    .text('Time');

  // x-axis gridlines
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis.tickSize((2 * padding) - height).tickFormat(''));

  // y-axis with ticks
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

  // y-axis label
  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${padding / 4},${height / 2}) rotate(-90)`)
    .text('Price ($)');

  // y-axis gridlines
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis.tickSize((2 * padding) - width).tickFormat(''));

  // animate from flat line to actual y values
  svg.append('path')
    .data([data])
    .attr('class', 'plot')
    .attr('stroke', coinColor[coin])
    .attr('d', flatLine)
    .transition()
    .duration(1000)
    .attr('d', dataLine);

  // add a pointer with a dot and a text
  const pointer = svg.append('g')
    .attr('class', 'pointer')
    .style('display', 'none');
  pointer.append('circle');
  pointer.append('text');

  // create a mouse overlay to capture mouse movement, display
  svg.append('rect')
    .attr('class', 'mouse-overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', () => d3.selectAll('.pointer').style('display', null))
    .on('mouseout', () => d3.selectAll('.pointer').style('display', 'none'))
    .on('mousemove', () => {
      // get x y position of where the mouse is
      const pos = d3.mouse(d3.select('.mouse-overlay').node());
      // invert x position to get corresponding time data
      const xTime = x.invert(pos[0]);
      // convert it to data index, limit it to the size of data array
      const i = d3.bisector(d => d.time).left(data, xTime, 0, data.length - 1);
      // move the pointer to the corresponding spot in the data line
      pointer.attr('transform', `translate(${x(data[i].time)}, ${y(data[i].close)})`);
      // display data
      pointer.select('text').text(`$${data[i].close}`);
    });
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
    this.getRangeData(this.props.activeCoin, '1D');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCoin !== nextProps.activeCoin) {
      this.getRangeData(nextProps.activeCoin, this.state.range);
    }
  }

  getRangeData(coin, range) {
    this.spinner(true);
    helpers.getRangeData(coin, range)
      .then((coinData) => {
        this.setState({ coinData, range }, () => renderTimeSeriesData(coin, this.state.coinData));
        this.spinner(false);
      });
  }

  spinner(isSpinning) {
    this.setState({ isLoading: isSpinning });
  }

  render() {
    const dClass = this.state.range === '1D' ? 'select' : 'unselect';
    const wClass = this.state.range === '1W' ? 'select' : 'unselect';
    const mClass = this.state.range === '1M' ? 'select' : 'unselect';
    const yClass = this.state.range === '1Y' ? 'select' : 'unselect';
    return (
      <div className="data-display-container">
        <div className="data-title">
          <div>
            Value of {this.props.activeCoin} in USD over
          </div>
          <div className="data-button-bar">
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1D')}
              className={dClass}
            >
              1D
            </button>
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1W')}
              className={wClass}
            >
              1W
            </button>
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1M')}
              className={mClass}
            >
              1M
            </button>
            <button
              onClick={() => this.getRangeData(this.props.activeCoin, '1Y')}
              className={yClass}
            >
              1Y
            </button>
          </div>
        </div>
        <div id="data-display" />
        <div className={this.state.isLoading ? 'data-overlay' : ''} />
        <div className={this.state.isLoading ? 'loader' : ''} />
      </div>
    );
  }
}

DataDisplay.propTypes = propTypes;
DataDisplay.defaultProps = defaultProps;

export default DataDisplay;
