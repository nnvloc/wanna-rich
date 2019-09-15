/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import AppContainer from './Routes';
import { results } from './global';

const App = () => {
  global.results = Object.keys(results).map(key => ({
    date: key,
    value: results[key].value,
    extra: results[key].extra,
  }));

  return <AppContainer />;
};

export default App;
