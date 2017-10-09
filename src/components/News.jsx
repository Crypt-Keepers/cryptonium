import React from 'react';
import uniqBy from 'lodash/uniqBy';
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

<<<<<<< HEAD
class News extends React.Component {
  constructor(props) {
    super(props);
    this.setTrendingData = this.setTrendingData.bind(this);
=======
const parseData = (arr) => {
  const result = uniqBy(arr, 'id');
  return result.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (dateA - dateB > 0) {
      return -1;
    }
    if (dateA - dateB < 0) {
      return 1;
    }
    return 0;
  });
};


const checkListEquality = (arr1, arr2) => {
  if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
    return true;
  }
  return false;
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingSelected: true,
      curData: [],
    };

    this.setTrendingData = this.setTrendingData.bind(this);
    this.setMyData = this.setMyData.bind(this);
>>>>>>> (feat) Add my list add button in search that updates my news
    this.handleClick = this.handleClick.bind(this);
    this.refreshNews = this.refreshNews.bind(this);

    this.setTrendingData('Bitcoin', true);

<<<<<<< HEAD
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
=======
  componentDidMount() {
    this.setTrendingData(this.props.coin);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coin !== nextProps.coin && this.state.trendingSelected) {
      this.setTrendingData(nextProps.coin);
    }
    if (!checkListEquality(this.props.list, nextProps.list)) {
      this.setMyData(nextProps.list);
    }
  }

  setTrendingData(newCoin) {
    if (newCoin.length) {
      const coinArr = newCoin.split(' ');
      let dataArr = [];
      coinArr.forEach((coin) => {
        if (coin) {
          dataArr = dataArr.concat(newsData[coin]);
        }
      });
      dataArr = parseData(dataArr);
      this.setState({ curData: dataArr });
    } else {
      this.setState({ curData: newsData.trending });
    }
  }

  setMyData(coinArr) {
    let arr = [];
    coinArr.forEach((coin) => {
      arr = arr.concat(newsData[coin]);
    });
    arr = parseData(arr);
    this.setState({ curData: arr, trendingSelected: false });
>>>>>>> (feat) Add my list add button in search that updates my news
  }

  handleClick(isTrending) {
    if (isTrending && !this.props.curSelection !== 'trending') {
      this.props.changeSelection('trending');
    }
<<<<<<< HEAD
    if (!isTrending && this.props.curSelection === 'trending') {
      this.props.changeSelection(this.props.activeCoin);
=======
    if (!isTrending && this.state.trendingSelected) {
      this.setMyData(this.props.list);
>>>>>>> (feat) Add my list add button in search that updates my news
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
    activeCoin: state.coin,
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
