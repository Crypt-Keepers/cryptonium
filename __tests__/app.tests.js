//TODO:
// import react components to test
// Do something to component (call functions, set state, etc)
// Run assertion tests.
// import renderer from 'react-test-renderer';
import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import App from '../src/components/App';
import News from '../src/components/News';
import NewsItem from '../src/components/NewsItem';
import Search from '../src/components/Search';

configure({ adapter: new Adapter() });

describe('<Search/>', () => {
  it('should have a toggle button', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should intialize to all false coin selections', () => {
    const wrapper = shallow(<Search />);
    const state = wrapper.state();
    expect(state.isBitcoin).to.equal(false);
    expect(state.isLitecoin).to.equal(false);
    expect(state.isEtherium).to.equal(false);
  });
});

describe('<News/>', () => {
  it('should have a News buttons', () => {
    const wrapper = shallow(<News />);
    expect(wrapper.find('button')).to.have.length(2);
  });

  it('should render the right number of NewsItems', () => {
    const wrapper = shallow(<News />);
    const state = wrapper.state();
    const data = state.curData;
    expect(wrapper.find('NewsItem')).to.have.length(data.length);
  });
});

describe('<NewsItem/>', () => {
  it('should have a link to article', () => {
    const wrapper = shallow(<NewsItem />);
    expect(wrapper.find('a')).to.have.length(1);
  });
});
