/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppContainer from './Routes';
import results from './global';

const App = () => {
  global.results = Object.keys(results).map((key) => ({
    date: key,
    value: results[key].value,
    extra: results[key].extra,
  }));

  global.addResult = (obj) => {
    if (!obj.result || obj.date) {
      return 'Bad request';
    }

    global.results[obj.date] = {
      date: obj.date,
      value: obj.result,
      extra: obj.extra,
    };
    return global.results;
  };

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
