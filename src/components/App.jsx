import React from 'react';
import Modal from 'react-modal';
import Search from './Search';
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinList: '',
      list: [],
      modalIsOpen: true,
      username: '',
      activeCoin: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSearch(coin, isAdded = true) {
    let newString = `${this.state.coinList} ${coin.toLowerCase().trim()}`;
    if (!isAdded) {
      const re = new RegExp(coin, 'gi');
      newString = newString.replace(re, '');
    }
    this.setState({ coinList: newString.trim() });
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
    // TODO: Make api POST request to change list
    const arr = coins.toLowerCase().trim().split(' ');
    const set = new Set(this.state.list);
    arr.forEach((coin) => {
      if (!set.has(coin)) {
        set.add(coin);
      }
    });
    this.setState({ list: [...set] });
  }

  handlePanelClick(coin) {
    // TODO: Pass coin down to data display so new graph can be rendered
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
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
        {/* <Search onSearch={this.handleSearch} handleAdd={this.handleAdd} /> */}
        <div className="data-container">
          <DataDisplay activeCoin={this.state.activeCoin} />
          <Panel
            coin={this.state.coinList}
            list={this.state.list}
            handleClick={this.handlePanelClick}
          />
        </div>
        <News activeCoin={this.state.activeCoin} />
      </div>
    );
  }
}
