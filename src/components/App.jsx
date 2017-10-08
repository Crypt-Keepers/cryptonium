import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/appActions';
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

const propTypes = {
  activeCoin: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  changeUsername: PropTypes.func.isRequired,
};

const defaultProps = {
  activeCoin: 'Bitcoin',
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
  }

  handleSubmit(e) {
    const node = document.getElementById('username-field');
    const value = node ? node.value : '';
    this.props.changeUsername(value);
    e.preventDefault();
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { activeCoin, username } = this.props;
    return (
      <div>
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
            <DataDisplay activeCoin={activeCoin} />
            <Panel username={username} />
          </div>
          <News activeCoin={activeCoin} />
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => (
  {
    activeCoin: state.coin,
    username: state.username,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeCoin: actions.changeCoin,
    changeUsername: actions.changeUsername,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
