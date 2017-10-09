import React from 'react';
import * as d3 from 'd3';
<<<<<<< HEAD
<<<<<<< HEAD
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import helpers from '../helpers/api-helpers';
=======
import PropTypes from 'prop-types';
import coinData from '../coin-data';

const propTypes = {
  coin: PropTypes.string,
};

const defaultProps = {
  coin: '',
};
>>>>>>> graph selected coin, currently only one coin at a time

const propTypes = {
  activeCoin: PropTypes.string.isRequired,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
};

// DataDisplay maintains its own state since graph data is not shared between components
=======

>>>>>>> display time/value table and render x-y axis correctly
class DataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
<<<<<<< HEAD
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
        this.setState({ coinData, range }, () => this.renderTimeSeriesData(coin));
        this.spinner(false);
      });
  }

  spinner(isSpinning) {
    this.setState({ isLoading: isSpinning });
  }

  renderTimeSeriesData(coin) {
=======
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

>>>>>>> graph selected coin, currently only one coin at a time
    // svg / line graph settings, hardcoded, customizable
    const width = 640;
    const height = 400;
    const padding = 60;
    const xTicks = 7;
    const yTicks = 5;

    // if svg not found in the DOM, create one and append everything
    const svg = d3.select('#data-display').selectAll('svg');
    if (!svg.node()) {
      const init = d3.select('#data-display')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      init.append('g')
        .attr('class', 'xaxis')
        .attr('transform', `translate(0, ${height - padding})`);

      init.append('text')
        .attr('class', 'xlabel')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width / 2},${height - (padding / 4)})`)
        .text('Time');

      init.append('g')
        .attr('class', 'xgrid')
        .attr('transform', `translate(0, ${height - padding})`);

      init.append('g')
        .attr('class', 'yaxis')
        .attr('transform', `translate(${padding}, 0)`);

      init.append('text')
        .attr('class', 'ylabel')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${padding / 4},${height / 2}) rotate(-90)`)
        .text('Price ($)');

      init.append('g')
        .attr('class', 'ygrid')
        .attr('transform', `translate(${padding}, 0)`);

      init.append('path')
        .attr('class', `plot ${this.props.activeCoin}`);

      init.append('g')
        .attr('class', 'pointer')
        .style('display', 'none');
      d3.select('.pointer').append('circle');
      d3.select('.pointer').append('text');

      init.append('rect')
        .attr('class', 'mouse-overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => d3.selectAll('.pointer').style('display', null))
        .on('mouseout', () => d3.selectAll('.pointer').style('display', 'none'));
    }

    // extract time and close info from data
    // reverse data which is given reverse-chronologically
    const data = [];
<<<<<<< HEAD
    this.state.coinData.reverse().forEach((row) => {
=======
    coinData.map((row) => {
>>>>>>> graph selected coin, currently only one coin at a time
      data.push({ time: new Date(row[0] * 1000), close: row[4] });
    });

    // set x and y scale
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
    // const flatLine = d3.line()
    //   .x(d => x(d.time))
    //   .y(() => y(yDom[0]));

    // generate data line
    const dataLine = d3.line()
      .x(d => x(d.time))
      .y(d => y(d.close));

    // select and update all elements, add transition
    d3.select('.xaxis')
      .attr('opacity', 0)
      .call(xAxis)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.select('.xgrid')
      .attr('opacity', 0)
      .call(xAxis.tickSize((2 * padding) - height).tickFormat(''))
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.select('.yaxis')
      .attr('opacity', 0)
      .call(yAxis)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.select('.ygrid')
      .attr('opacity', 0)
      .call(yAxis.tickSize((2 * padding) - width).tickFormat(''))
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.selectAll('.xlabel,.ylabel')
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    d3.selectAll('.plot')
      .data([data])
      // .transition()
      // .duration(500)
      // .attr('d', flatLine)
      .transition()
      .duration(1000)
      .attr('d', dataLine)
      .attr('class', `plot ${this.props.activeCoin}`);

    d3.select('.mouse-overlay')
      .on('mousemove', () => {
        // get x y position of where the mouse is
        const pos = d3.mouse(d3.select('.mouse-overlay').node());
        // invert x position to get corresponding time data
        const xTime = x.invert(pos[0]);
        // convert it to data index, limit it to the size of data array
        const i = d3.bisector(d => d.time).left(data, xTime, 0, data.length - 1);
        // move the pointer to the corresponding spot in the data line
        d3.select('.pointer')
          .attr('transform', `translate(${x(data[i].time)}, ${y(data[i].close)})`);
        // display data
        d3.select('.pointer')
          .select('text').text(`$${data[i].close}`);
      });
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
        <div id="data-display">
          <div className={this.state.isLoading ? 'data-overlay' : ''} />
          <div className={this.state.isLoading ? 'loader' : ''} />
        </div>
=======
    };
  }

  componentDidMount() {
    this.displayData();
  }

  displayData() {
    const datapoints = this.props.data.length; // 200 for gdax
    const width = 600;
    const height = 400;
    const padding = 40;


    let svg = d3.select('#data-display').append('svg').attr('width', width).attr('height', height);

    let timeEnd = new Date(this.props.data[0][0] * 1000);
    let timeStart = new Date(this.props.data[this.props.data.length - 1][0] * 1000);
    console.log(timeEnd, timeStart);

    let xScale = d3.scaleTime().domain([timeEnd, timeStart]).range([(width - 2 * padding), 0]);
    let yScale = d3.scaleLinear().domain([4000, 4400]).range([(height - 2 * padding), 0]); // find y min and max

    let xAxis = d3.axisBottom(xScale).ticks(5);
    let yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g').attr('transform', `translate(${padding}, ${height - padding})`).call(xAxis); // 30 is space from bottom
    svg.append('g').attr('transform', `translate(${padding}, ${padding})`).call(yAxis);
  }

  render() {
<<<<<<< HEAD
    let rowData = this.props.data.map((row) => {
      return (
        <tr key={row[0]}>
          <td>{row[0]}</td>
          <td>{row[4]}</td>
        </tr>
      );
    });

=======
>>>>>>> graph selected coin, currently only one coin at a time
    return (
      <div>DataDisplay
        <div id="data-display"></div>
        <button>1D</button>
        <button>1W</button>
        <button>1M</button>
        <button>1Y</button>
>>>>>>> display time/value table and render x-y axis correctly
      </div>
    );
  }
}
<<<<<<< HEAD

DataDisplay.propTypes = propTypes;
DataDisplay.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    activeCoin: state.coin,
  }
);
=======
>>>>>>> display time/value table and render x-y axis correctly

<<<<<<< HEAD
export default connect(mapStateToProps)(DataDisplay);
=======
DataDisplay.propTypes = propTypes;
DataDisplay.defaultProps = defaultProps;

export default DataDisplay;
>>>>>>> graph selected coin, currently only one coin at a time
