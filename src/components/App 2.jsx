import React from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import DataDisplay from './DataDisplay';
import Panel from './Panel';
import News from './News';

const customStyles = {
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      username: '',
      activeCoin: 'Bitcoin',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(e) {
    const node = document.getElementById('username-field');
    const value = node ? node.value : '';
    this.setState({ username: value });
    e.preventDefault();
    this.closeModal();
  }

  handlePanelClick(coin) {
    if (this.state.activeCoin !== coin) {
      this.setState({ activeCoin: coin });
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <div className="logo">
            <div>Cryptonium</div>
            <img src="logo.png" alt="" />
          </div>
          <div className="greeting">
            <div>Hi {this.state.modalIsOpen ? '' : this.state.username}</div>
            <img src="avatar.png" alt="" />
          </div>
        </div>
        <div className="component-container">
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
                  id="username-field"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Modal>
          <div className="data-container">
            <DataDisplay activeCoin={this.state.activeCoin} />
            <Panel
              handleClick={this.handlePanelClick}
              username={this.state.username}
            />
          </div>
          <News activeCoin={this.state.activeCoin} />
        </div>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
