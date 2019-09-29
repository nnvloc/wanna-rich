import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools';
import reducers from '../reducers';

console.log('reducers: ', reducers);

const store = createStore(combineReducers(reducers));

export default store;
