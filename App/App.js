/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';
import Routes from './Routes';

import { initResults } from './actions';

import { getData } from './services';

const mapStateToProps = (state) => ({
  results: state.results,
});

const mapDispatchToProps = {
  initResults,
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)((props) => {
  getData()
    .then(results => {
      if (results) {
        const parsedResults = Object.keys(results).map((key) => ({
          date: key,
          value: results[key].value,
          extra: results[key].extra,
        }));
      
        props.initResults(parsedResults);
      }
    })
    .catch(err => console.log('err: ', err));
  

  return <Routes />
});

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
