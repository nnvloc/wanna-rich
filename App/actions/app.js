export const ADD_RESULT = 'ADD_RESULT';
export const ADD_RESULT_SUCCESS = 'ADD_RESULT_SUCCESS';
export const ADD_RESULT_FAILURE = 'ADD_RESULT_FAILURE';
export const INIT_RESULTS = 'INIT_RESULTS';

export const addResult = (payload) => ({
  type: ADD_RESULT,
  payload,
});

export const addResultSuccess = (result) => ({
  type: ADD_RESULT_SUCCESS,
  result,
});

export const addResultFail = (err) => ({
  type: ADD_RESULT_FAILURE,
  err,
});

export const initResults = (results) => ({
  type: INIT_RESULTS,
  results,
});
