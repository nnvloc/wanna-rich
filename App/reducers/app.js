import {
  INIT_RESULTS,
  ADD_RESULT,
  ADD_RESULT_SUCCESS,
  ADD_RESULT_FAILURE,
} from '../actions/app';

const initState = {
  results: {}
}

const AppReducer = (state = initState, action) => {
  switch(action.type) {
    case INIT_RESULTS: {
      const { results } = action;
      return { ...state, results };
    }
    case ADD_RESULT: {
      return { ...state }
    }
    case ADD_RESULT_SUCCESS: {
      console.log('add result success');
      return { ...state };
    }
    case ADD_RESULT_FAILURE: {
      console.log('add result fail: ', action.err);
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
}

export default AppReducer;
