import React from 'react';
import Modal from 'react-modal';
<<<<<<< HEAD
<<<<<<< HEAD
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/appActions';
=======
import Search from './Search';
>>>>>>> (feat) Add my list add button in search that updates my news
=======
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
>>>>>>> (feat) redux setup
import DataDisplay from './DataDisplay';
import Panel from './Panel';
import News from './News';
<<<<<<< HEAD
=======
// import dummyData from '../data.json';
>>>>>>> graph selected coin, currently only one coin at a time

const customStyles = {
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
<<<<<<< HEAD
=======
    // right                 : 'auto',
    // bottom                : 'auto',
    // marginRight           : '-50%',
>>>>>>> (feat) Add my list add button in search that updates my news
    transform: 'translate(-50%, -50%)',
  },
};

<<<<<<< HEAD
<<<<<<< HEAD
const propTypes = {
  username: PropTypes.string.isRequired,
  changeUsername: PropTypes.func.isRequired,
};

const defaultProps = {
  username: '',
  changeUsername: e => (e),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
=======
export default class App extends React.Component {
=======
class App extends React.Component {
>>>>>>> (feat) redux setup
  constructor(props) {
    super(props);
    this.state = {
      // data: dummyData,
      curCoin: '',
      list: [],
      modalIsOpen: true,
      username: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
>>>>>>> (feat) Add my list add button in search that updates my news
  }

  handleSubmit(e) {
    const node = document.getElementById('username-field');
    const value = node ? node.value : '';
    this.props.changeUsername(value);
    e.preventDefault();
    this.setState({ modalIsOpen: false });
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmit(e) {
    // TODO: Make API call with username to either create new username
    // or get existing username's list.
    e.preventDefault();
    this.closeModal();
  }

  handleAdd(coins) {
    // TODO: Make api POST request to add new list
    const arr = coins.toLowerCase().trim().split(' ').concat(this.state.list);
    const set = new Set(arr);
    this.setState({ list: [...set] });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { username } = this.props;
    return (
      <div>
<<<<<<< HEAD
        <div className="nav-bar">
          <div className="logo">
            <div>Cryptonium</div>
            <img src="logo.png" alt="" />
          </div>
          <div className="greeting">
            <div>Hi {username}</div>
            <img src="avatar.png" alt="" />
          </div>
        </div>
        <div className="component-container">
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Login"
            style={customStyles}
          >
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                Enter your username:
                <input
                  type="text"
                  name="username"
                  id="username-field"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Modal>
          <div className="data-container">
            <DataDisplay />
            <Panel />
          </div>
          <News />
        </div>
=======
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">
              Enter your username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
        <Search onSearch={this.handleSearch} handleAdd={this.handleAdd} />
        <DataDisplay coin={this.state.curCoin} />
        <Panel />
        <News coin={this.state.curCoin} list={this.state.list} />
>>>>>>> (feat) Add my list add button in search that updates my news
      </div>
    );
  }
}

<<<<<<< HEAD
App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    username: state.username,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeUsername: actions.changeUsername,
  }, dispatch)
);
=======
const mapStateToProps = (state = {}, props) => {
  return {
    results: state.results.returnedResults,
    saved: state.saved,
    noResults: state.results.noResults,
    page: state.page,
    isFetching: state.isFetching,
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addNasaItem: actions.addNasaItem,
    deleteItem: actions.deleteItem,
    searchNasa: actions.searchNASA,
    setSavedFromStorage: actions.setSavedFromStorage,
    changePage: actions.changePage
  }, dispatch)
}
>>>>>>> (feat) redux setup

export default connect(mapStateToProps, mapDispatchToProps)(App);
