import React from 'react';
import * as d3 from 'd3';

class DataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let rowData = this.props.data.map((row) => {
      return (
        <tr key={row[0]}>
          <td>{row[0]}</td>
          <td>{row[4]}</td>
        </tr>
      );
    });

    return (
      <div>DataDisplay
        <div id="data-display"></div>
        <table>
          <thead>
            <tr>
              <th>time</th>
              <th>close</th>
            </tr>
          </thead>
          <tbody>
            {rowData}
          </tbody>
        </table>
        <button>1D</button>
        <button>1W</button>
        <button>1M</button>
        <button>1Y</button>
      </div>
    );
  }
}

export default DataDisplay;
