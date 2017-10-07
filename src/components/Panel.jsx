import React from 'react';
import PropTypes from 'prop-types';
import Overview from './Overview';
import MyFinances from './MyFinances';

const propTypes = {
  handleClick: PropTypes.func,
  username: PropTypes.string,
};

const defaultProps = {
  handleClick: () => {},
  username: '',
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'overview',
    };
  }

  changePanel(view) {
    this.setState({
      view,
    });
  }

  render() {
    const overviewClass = this.state.view === 'overview' ? 'panel-show' : 'panel-hide';
    const myFinancesClass = this.state.view === 'overview' ? 'panel-hide' : 'panel-show';
    const overviewButton = this.state.view === 'overview' ? 'select' : 'unselect';
    const financeButton = this.state.view === 'overview' ? 'unselect' : 'select';
    return (
      <div className="panel-container">
        <div className="panel-nav">
          <button className={overviewButton} onClick={() => this.changePanel('overview')}>
            Coin Overview
          </button>
          <button className={financeButton} onClick={() => this.changePanel('finances')}>
            My Finances
          </button>
        </div>
        <div className="main">
          <Overview className={overviewClass} handleClick={this.props.handleClick} />
          <MyFinances
            className={myFinancesClass}
            username={this.props.username}
            handleClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
