import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice";
import userReducer from "./userSlice";
import updateProfileReducer from "./updateProfileSlice";
import forgotPassReducer from "./forgotPassSlice";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPassReducer,
});

const store = configureStore({
  reducer,
});

export default store;
