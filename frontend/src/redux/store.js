import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice";

const reducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
});

const store = configureStore({
  reducer,
});

export default store;
