import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import changePanelSelection from '../actions/panelActions';
import Overview from './Overview';
import MyFinances from './MyFinances';

const propTypes = {
<<<<<<< HEAD
=======
  handleClick: PropTypes.func,
  username: PropTypes.string.isRequired,
>>>>>>> (refactor) Add redux to panel, begin refactor for overview
  view: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

const defaultProps = {
<<<<<<< HEAD
=======
  handleClick: () => {},
  username: '',
>>>>>>> (refactor) Add redux to panel, begin refactor for overview
  view: 'overview',
  changeView: e => (e),
};

<<<<<<< HEAD
const Panel = (props) => {
  const overviewClass = props.view === 'overview' ? 'panel-show' : 'panel-hide';
  const myFinancesClass = props.view === 'overview' ? 'panel-hide' : 'panel-show';
  const overviewButton = props.view === 'overview' ? 'select' : 'unselect';
  const financeButton = props.view === 'overview' ? 'unselect' : 'select';
=======
class Panel extends React.Component {
  changePanel(view) {
    this.props.changeView(view);
  }
>>>>>>> (refactor) Add redux to panel, begin refactor for overview

<<<<<<< HEAD
  return (
    <div className="panel-container">
      <div className="panel-nav">
        <button className={overviewButton} onClick={() => props.changeView('overview')}>
          Coin Overview
        </button>
        <button className={financeButton} onClick={() => props.changeView('finances')}>
          My Finances
        </button>
=======
  render() {
<<<<<<< HEAD
=======
    const overviewClass = this.props.view === 'overview' ? 'panel-show' : 'panel-hide';
    const myFinancesClass = this.props.view === 'overview' ? 'panel-hide' : 'panel-show';
    const overviewButton = this.props.view === 'overview' ? 'select' : 'unselect';
    const financeButton = this.props.view === 'overview' ? 'unselect' : 'select';
>>>>>>> (refactor) Add redux to panel, begin refactor for overview
    return (
      <div>
        <div>Side Panel</div>
        <div className="nav">
          <button onClick={() => this.changePanel('trending')}>
            Panel - Trending
          </button>
          <button onClick={() => this.changePanel('myList')}>
            Panel - My List
          </button>
        </div>
        <div className="main">
<<<<<<< HEAD
          {this.state.view === 'trending'
            ? <Trending />
            : <MyList list={this.props.list} handleClick={this.props.handleClick}/>}
=======
          {/* <Overview className={overviewClass} handleClick={this.props.handleClick} /> */}
          <Overview className={overviewClass} />
          <MyFinances
            className={myFinancesClass}
            username={this.props.username}
            handleClick={this.props.handleClick}
          />
>>>>>>> (refactor) Add redux to panel, begin refactor for overview
        </div>
>>>>>>> get ticker data to show up on trending side panel
      </div>
      <div className="main">
        <Overview className={overviewClass} />
        <MyFinances className={myFinancesClass} />
      </div>
    </div>
  );
};

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    view: state.panelSelect,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeView: changePanelSelection,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
