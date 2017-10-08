import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  article: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    published_at: PropTypes.string,
    source: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

const defaultProps = {
  article: {
    url: '',
    title: '',
    published_at: '',
    source: {},
  },
};

const NewsItem = props => (
  <a className="news-item" href={props.article.url} target="_blank">
    <div className="title">
      {props.article.title}
    </div>
    <div className="date">{(new Date(props.article.published_at)).toString()}</div>
    <div className="source">{props.article.source.title}</div>
  </a>
);

NewsItem.propTypes = propTypes;
NewsItem.defaultProps = defaultProps;

export default NewsItem;
