import { createStore, combineReducers } from 'redux';
import reducers from '../reducers';

const reducers = combineReducers(reducers);
const store = createStore(reducers);

export default store;
