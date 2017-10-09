<<<<<<< HEAD
=======
//TODO:
// import react components to test
// Do something to component (call functions, set state, etc)
// Run assertion tests.
>>>>>>> (test) Test for modal appearance
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import App from '../src/components/App';
import News from '../src/components/News';
import NewsItem from '../src/components/NewsItem';
<<<<<<< HEAD
import Overview from '../src/components/Overview';
=======
import Search from '../src/components/Search';
>>>>>>> get ticker data to show up on trending side panel
import DataDisplay from '../src/components/DataDisplay';

configure({ adapter: new Adapter() });

describe('<App/>', () => {
  it('should have a modal on popup', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Modal')).to.have.length(1);
<<<<<<< HEAD
=======
  });
});

describe('<Search/>', () => {
  it('should have a toggle and add button', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('button')).to.have.length(2);
  });

  it('should intialize to all false coin selections', () => {
    const wrapper = shallow(<Search />);
    const state = wrapper.state();
    expect(state.isBitcoin).to.equal(false);
    expect(state.isLitecoin).to.equal(false);
    expect(state.isEtherium).to.equal(false);
>>>>>>> (test) Test for modal appearance
  });
});

describe('<News/>', () => {
  it('should have a News buttons', () => {
    const wrapper = shallow(<News />);
    expect(wrapper.find('button')).to.have.length(2);
  });

  it('should render the right number of trending NewsItems', () => {
    const wrapper = shallow(<News />);
    const state = wrapper.state();
    const data = state.trending;
    expect(wrapper.find('NewsItem')).to.have.length(data.length);
  });
});

describe('<NewsItem/>', () => {
  it('should have a link to article', () => {
    const wrapper = shallow(<NewsItem />);
    expect(wrapper.find('a')).to.have.length(1);
  });
});

describe('<Overview/>', () => {
  it('should render a table', () => {
    const wrapper = shallow(<Overview />);
    expect(wrapper.find('table')).to.have.length(1);
  });
  it('should render data from all three coins', () => {
    const wrapper = shallow(<Overview />);
    expect(wrapper.find('TableRow')).to.have.length(3);
  });
});
