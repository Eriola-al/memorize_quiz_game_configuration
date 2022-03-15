const initialState = {
    level: "",
    score: 0,
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHANGE_LEVEL":
        return { ...state, level: action.level };
      case "ADD_SCORE":
        return { ...state, score: state.score + 1 };
      case "RESET":
        return { ...state, score: 0 };
      default:
        return state;
    }
  };
  export default reducer;