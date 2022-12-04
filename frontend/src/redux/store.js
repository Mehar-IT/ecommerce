import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice";
import userReducer from "./userSlice";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
});

const store = configureStore({
  reducer,
});

export default store;
