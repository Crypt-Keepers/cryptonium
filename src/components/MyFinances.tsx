import * as React from 'react';
import * as d3 from 'd3';
import helpers from '../helpers/api-helpers';


interface IMyFinancesProps {
  className: string,
  handleClick: any, // TBD to function
  username: string,
}

interface IMyFinancesState {
  coin: string,
  quantity: string,
  position: object,
  value: object,
  sum: number,
  showAlert: boolean,
};

// const defaultProps = {
//   className: '',
//   handleClick: e => (e),
//   username: '',
// };

const coinName = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  LTC: 'Litecoin',
};

const coinColor = {
  Bitcoin: '#D3D4D9',
  Ethereum: '#B95F89',
  Litecoin: '#4B88A2',
};

class MyFinances extends React.Component<IMyFinancesProps, IMyFinancesState> {
  constructor(props: IMyFinancesProps) {
    super(props);
    this.state = {
      coin: 'BTC',
      quantity: '',
      position: {},
      value: {},
      sum: 0,
      showAlert: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username.length) {
      helpers.getUserData(nextProps.username)
        .then(userData => this.generateTableAndChart(userData));
    }
  }

  addCoin() {
    helpers.postUserData(this.props.username, this.state.coin, this.state.quantity)
      .then(() => helpers.getUserData(this.props.username))
      .then(userData => this.generateTableAndChart(userData))
      .then(() => {
        this.setState({
          coin: 'BTC',
          quantity: '',
          showAlert: true,
        });
        setTimeout(() => {
          this.setState({
            showAlert: false,
          });
        }, 5000);
      });
  }

  generateTableAndChart(userData) {
    return helpers.getTickerData()
      .then((tickerData) => {
        const value = {};
        let sum = 0;
        tickerData.forEach((coinObj) => {
          value[coinObj.coin] = (userData.position[coinObj.coin] * coinObj.data.price).toFixed(2);
          sum += userData.position[coinObj.coin] * coinObj.data.price;
        });
        // sum = sum.toFixed(2); // as it is getting converted to string
        return this.setState({
          position: userData.position,
          value,
          sum,
        }, () => {
          if (this.state.sum !== 0.00) {
            this.renderPieChart(this.state.value);
          }
        });
      });
  }

  renderPieChart(valueData) {
    d3.select('#pie-chart').selectAll('svg').remove();

    // customizable parameters
    const width = 200;
    const height = 200;
    const radius = 85;
    const labelPadding = 40;
    const animationPadding = 15;

    // process data
    const data: Array<any> = [];
    Object.keys(valueData).forEach((key) => {
      if (valueData[key] !== '0.00') {
        data.push({coin: coinName[key], value: valueData[key] });
      }
    });

    const pie = d3.pie().value((d: any) => d.value);

    // append svg
    const svg = d3.select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // pie chart with no hole
    const path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    // text label position
    const label = d3.arc()
      .outerRadius(radius - labelPadding)
      .innerRadius(radius - labelPadding);

    // append everything
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc: any = g.selectAll('.slice')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', (d: any) => `slice ${d.data.coin}`)
      .on('click', (d: any) => this.props.handleClick(d.data.coin))
      .on('mouseover', (d: any) => {
        d3.select(`.${d.data.coin}`)
          .transition()
          .duration(500)
          .attr('transform', () => {
            const midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
            const x = Math.sin(midAngle) * animationPadding;
            const y = -Math.cos(midAngle) * animationPadding;
            return `translate(${x},${y})`;
          });
      })
      .on('mouseout', (d: any) => {
        d3.select(`.${d.data.coin}`)
          .transition()
          .duration(500)
          .attr('transform', 'translate(0, 0)');
      });

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => coinColor[d.data.coin]);

    const rotateLabel = (d) => {
      const midAngle = (180 * (d.startAngle + d.endAngle)) / (2 * Math.PI);
      return (midAngle > 180) ? midAngle + 90 : midAngle - 90;
    };

    arc.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${label.centroid(d)}) rotate(${rotateLabel(d)})`)
      .text(d => d.data.coin);
  }

  render() {
    const Alert = (this.state.showAlert)
      ? <div>Coin added to {`${this.props.username}'`}s Wallet!</div>
      : '';
    const TableData = Object.keys(this.state.position).map(key => (
      <tr key={key} onClick={() => this.props.handleClick(coinName[key])}>
        <td>{coinName[key]}</td>
        <td>{this.state.position[key]}</td>
        <td>$ {this.state.value[key]}</td>
      </tr>
    ));
    return (
      <div className={`my-finance ${this.props.className}`}>
        <div className="wallet-entry">
          <select
            value={this.state.coin}
            onChange={e => this.setState({ coin: e.target.value })}
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="LTC">Litecoin</option>
          </select>
          <input
            type="number"
            value={this.state.quantity}
            onChange={e => this.setState({ quantity: e.target.value })}
            placeholder="Enter Quantity"
          />
          <button onClick={() => this.addCoin()}>Add</button>
        </div>
        {Alert}
        <div>{`${this.props.username}'`}s Wallet in USD</div>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>

          </thead>
          <tbody>
            {TableData}
            <tr>
              <td>Total:</td>
              <td />
              <td>$ {this.state.sum}</td>
            </tr>
          </tbody>
        </table>
        <div id="pie-chart" />
      </div>
    );
  }
}


export default MyFinances;