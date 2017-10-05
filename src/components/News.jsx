import React from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import helpers from '../helpers/api-helpers';

const propTypes = {
  activeCoin: PropTypes.string,
};

const defaultProps = {
  activeCoin: '',
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curSelection: 'trending',
      trending: [],
      bitcoin: [],
      litecoin: [],
      etherium: [],
    };

    this.setTrendingData = this.setTrendingData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshNews = this.refreshNews.bind(this);

    setInterval(() => {
      this.refreshNews();
    }, (60000 * 3));
  }

  componentDidMount() {
    this.setTrendingData('bitcoin', true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCoin !== nextProps.activeCoin) {
      this.setTrendingData(nextProps.activeCoin, false);
    }
  }

  setTrendingData(newCoin, fetchTrending) {
    if (fetchTrending) {
      helpers.getTrendingNews()
        .then((data) => {
          this.setState({ trending: data.results });
        })
        .catch(err => (err));
    }
    if (!this.state[newCoin].length) {
      helpers.getCoinData(newCoin)
        .then((data) => {
          this.setState({ [newCoin]: data.results });
        })
        .catch(err => (err));
    }

    if (this.state.curSelection !== 'trending') {
      this.setState({ curSelection: newCoin });
    }
  }

  refreshNews() {
    const newsArr = ['trending', 'bitcoin', 'litecoin', 'etherium'];
    newsArr.forEach((el) => {
      if (this.state[el].length) {
        if (el === 'trending') {
          helpers.getTrendingNews()
            .then((data) => {
              this.setState({ trending: data.results });
            })
            .catch(err => (err));
        } else {
          helpers.getCoinData(el)
            .then((data) => {
              this.setState({ [el]: data.results });
            })
            .catch(err => (err));
        }
      }
    });
  }

  handleClick(isTrending) {
    if (isTrending && !this.state.curSelection !== 'trending') {
      this.setState({ curSelection: 'trending' });
    }
    if (!isTrending && this.state.curSelection === 'trending') {
      const newCoin = this.props.activeCoin ? this.props.activeCoin : 'bitcoin';
      this.setState({ curSelection: newCoin });
    }
  }

  render() {
    const curArr = this.state[this.state.curSelection];
    const curCoinName = this.props.activeCoin.length
      ? this.props.activeCoin[0].toUpperCase() + this.props.activeCoin.slice(1)
      : 'Bitcoin';
    return (
      <div>
        <div className="top-button-bar">
          <button onClick={() => { this.handleClick(true); }} >
            Trending
          </button>
          <button onClick={() => { this.handleClick(false); }} >
            {`${curCoinName} News`}
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

export default News;
