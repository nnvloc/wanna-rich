import {
  INIT_RESULTS,
  ADD_RESULT,
  ADD_RESULT_SUCCESS,
  ADD_RESULT_FAILURE,
} from '../actions/app';

const initState = {
  results: {},
  err: null,
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
      return { ...state, ...(action.payload || {}), err: null };
    }
    case ADD_RESULT_FAILURE: {
      return { ...state, };
    }
    default: {
      return { ...state };
    }
  }
}

export default AppReducer;
