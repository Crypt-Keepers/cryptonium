import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/newsActions';
import NewsItem from './NewsItem';

const propTypes = {
  activeCoin: PropTypes.string.isRequired,
  fetchTrending: PropTypes.func.isRequired,
  trending: PropTypes.arrayOf(PropTypes.object).isRequired,
  curSelection: PropTypes.string.isRequired,
  coinNewsObj: PropTypes.objectOf(PropTypes.array).isRequired,
  changeSelection: PropTypes.func.isRequired,
  fetchCoinNews: PropTypes.func.isRequired,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
  fetchTrending: e => (e),
  changeSelection: e => (e),
  fetchCoinNews: e => (e),
  trending: [],
  curSelection: 'trending',
  coinNewsObj: {},
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.setTrendingData = this.setTrendingData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshNews = this.refreshNews.bind(this);

    this.setTrendingData('Bitcoin', true);

    setInterval(() => {
      this.refreshNews();
    }, (60000 * 3));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCoin !== nextProps.activeCoin) {
      this.setTrendingData(nextProps.activeCoin, false);
    }
  }

  setTrendingData(newCoin, fetchTrending) {
    if (fetchTrending) {
      this.props.fetchTrending();
    }
    const curCoinNews = this.props.coinNewsObj[newCoin];
    if (!curCoinNews) {
      this.props.fetchCoinNews(newCoin);
    }

    if (this.props.curSelection !== 'trending') {
      this.props.changeSelection(newCoin);
    }
  }

  refreshNews() {
    this.props.fetchTrending();
    const newsArr = ['Bitcoin', 'Litecoin', 'Ethereum'];
    newsArr.forEach((el) => {
      const cur = this.props.coinNewsObj[el];
      if (cur) {
        this.props.fetchCoinNews(el);
      }
    });
  }

  handleClick(isTrending) {
    if (isTrending && !this.props.curSelection !== 'trending') {
      this.props.changeSelection('trending');
    }
    if (!isTrending && this.props.curSelection === 'trending') {
      this.props.changeSelection(this.props.activeCoin);
    }
  }

  render() {
    const curArr =
      (this.props.curSelection === 'trending'
        ? this.props.trending
        : this.props.coinNewsObj[this.props.curSelection]) || [];
    const trendClass = this.props.curSelection === 'trending' ? 'select' : 'unselect';
    const newsClass = this.props.curSelection === 'trending' ? 'unselect' : 'select';

    return (
      <div className="news-panel">
        <div className="top-button-bar">
          <button className={trendClass} onClick={() => { this.handleClick(true); }} >
            <img src="trending.png" alt="Trending" />
          </button>
          <button className={newsClass} onClick={() => { this.handleClick(false); }} >
            <img src="newspaper.ico" alt="News for Coin" />
          </button>
        </div>
        <div className="news-container">
          {curArr.map(article => (
            <NewsItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    );
  }
}

News.propTypes = propTypes;
News.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    trending: state.newsTrending,
    curSelection: state.newsSelect,
    coinNewsObj: state.newsCoin,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchTrending: actions.newsFetchTrending,
    changeSelection: actions.changeNewsSelection,
    fetchCoinNews: actions.newsFetchCoin,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(News);
