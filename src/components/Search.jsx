import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onSearch: PropTypes.func,
};

const defaultProps = {
  onSearch: e => (e),
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
      isBitcoin: false,
      isLitecoin: false,
      isEtherium: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  toggleMenu() {
    const newState = !this.state.dropdownActive;
    this.setState({ dropdownActive: newState });
  }

  handleClick(e) {
    this.props.onSearch(e.target.textContent);
  }

  handleCheckChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.checked });
    this.props.onSearch(e.target.name.slice(2), e.target.checked);
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleMenu}>Select Coins</button>
        <div className={this.state.dropdownActive ? 'menu-show' : 'menu-hide'}>
          <form>
            <label htmlFor="bitcoin">
              Bitcoin
              <input
                name="isBitcoin"
                type="checkbox"
                checked={this.state.isBitcoin}
                onChange={this.handleCheckChange}
              />
            </label>
            <br />
            <label htmlFor="litecoin">
              Litecoin
              <input
                name="isLitecoin"
                type="checkbox"
                checked={this.state.isLitecoin}
                onChange={this.handleCheckChange}
              />
            </label>
            <br />
            <label htmlFor="etherium">
              Etherium
              <input
                name="isEtherium"
                type="checkbox"
                checked={this.state.isEtherium}
                onChange={this.handleCheckChange}
              />
            </label>
            <br />
          </form>
        </div>
      </div>
    );
  }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
