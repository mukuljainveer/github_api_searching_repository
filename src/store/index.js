import { configureStore } from "@reduxjs/toolkit";
import { generalReducer } from "./reducer";

const { combineReducers } = require("redux");

export const setList = (data) => {
  console.log("data: ", data);
  return {
    type: "SET_LIST",
    data,
  };
};

export const rootReducers = combineReducers({
  general: generalReducer,
});

let store = configureStore({ reducer: rootReducers });

export default store;
