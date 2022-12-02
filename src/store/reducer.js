let initialState = {
  list: [],
};

export const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        list: action.data,
      };
    default:
      return state;
  }
};
