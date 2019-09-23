const initState = {
  results: {}
}

const AppReducer = (state = initState, action) => {
  switch(action.type) {
    default: {
      return { ...state };
    }
  }
}

export default AppReducer;
