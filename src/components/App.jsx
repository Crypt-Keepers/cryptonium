import React from 'react';
import Search from './Search';
import DataDisplay from './DataDisplay';
import Panel from './Panel';
import News from './News';
import Model from '../model-view';
// import dummyData from '../data.json';
// import helpers from '../helpers/api-helpers';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: Model,
    };
  }


  // handleClick() {
  // const newData = helpers.test();
  // Model.data = newData;
  // console.log('model.data is', Model.data);
  // this.setState({data: Model});
  // }

  render() {
    return (
      <div>
        <Search />
        <DataDisplay data={this.state.model.data} />
        <Panel />
        <News />
      </div>
    );
  }
}
