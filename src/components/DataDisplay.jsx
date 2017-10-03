import React from 'react';
import * as d3 from 'd3';

class DataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // need to figure out good data to use to render data
  // each time data refreshes
  componentDidMount() {
    this.renderTimeSeriesData();
  }

  renderTimeSeriesData() {
    // svg / line graph settings, hardcoded, customizable
    const width = 600;
    const height = 400;
    const padding = 40;
    const xTicks = 6;
    const yTicks = 4;

    // extract time and close info from data
    const data = [];
    this.props.data.map((row) => {
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
    const rowData = this.props.data.map((row) => {
      return <tr key={row[0]}>
        <td>{row[0]}</td>
        <td>{row[4]}</td>
      </tr>;
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
