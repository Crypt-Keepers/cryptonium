import * as React from 'react';
import * as d3 from 'd3';
import helpers from '../helpers/api-helpers';

interface IDataDisplayProps {
  activeCoin: string,
};


// const defaultProps = {
//   activeCoin: 'Bitcoin',
// };

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
  const data: Array<any> = [];
  coinData.forEach((row) => {
    data.push({ time: new Date(row[0] * 1000), close: row[4] });
  });

  const svg = d3.select('#data-display')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // set x and y range
  // x range is set this way because data given reverse-chronologically
  const x = d3.scaleTime()
    .range([padding, (width - padding)]);
  const y = d3.scaleLinear()
    .range([(height - padding), padding]);

  // set x and y domain
  const xDom: Array<any> = d3.extent(data, d => d.time);
  const yDom: Array<any> = d3.extent(data, d => d.close);

  // set x and y axis, use extend to calculate domain
  const xAxis = d3
    .axisBottom(x.domain(xDom))
    .ticks(xTicks);
  const yAxis = d3
    .axisLeft(y.domain(yDom))
    .ticks(yTicks);

  // generate initial flat line
  const flatLine = d3.line()
    .x((d: any) => x(d.time))
    .y(() => y(yDom[0]));

  // generate data line
  const dataLine = d3.line()
    .x((d: any) => x(d.time))
    .y((d: any) => y(d.close));

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
    .call(xAxis.tickSize((2 * padding) - height).tickFormat((aaa:any) => ''));

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
    .call(yAxis.tickSize((2 * padding) - width).tickFormat((aaa:any) => ''));

  // animate from flat line to actual y values
  svg.append('path')
    .data([data])
    .attr('class', 'plot')
    .attr('stroke', coinColor[coin])
    .attr('d', flatLine)
    .transition()
    .duration(1000)
    .attr('d', dataLine);
};


class DataDisplay extends React.Component<any, any> {
  constructor(props: any) {
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


export default DataDisplay;
