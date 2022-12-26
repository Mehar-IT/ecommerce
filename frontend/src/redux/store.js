import {
  configureStore,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice";
import userReducer from "./userSlice";
import updateProfileReducer from "./updateProfileSlice";
import forgotPassReducer from "./forgotPassSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import myOrdersReducer from "./myOrdersSlice";
import orderDetailReducer from "./orderDetailSlice";
import reviewReducer from "./reviewSlice";
import newProductReducer from "./newProductSlice";
import deleteProductReducer from "./deleteProduct";
import updateProfileSlice from "./updateProductSlice";
import orderListReducer from "./adminSlice/orderListSlice";
import updateOrderReducer from "./adminSlice/updateOrderSlice";
import deleteOrderReducer from "./adminSlice/deleteOrderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const appReducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPassReducer,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrdersReducer,
  orderDetail: orderDetailReducer,
  review: reviewReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProfileSlice,
  orderList: orderListReducer,
  updateOrder: updateOrderReducer,
  deleteOrder: deleteOrderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export const resetAllData = createAsyncThunk(
  "reset",
  function (_payload, thunkAPI) {
    thunkAPI.dispatch({ type: "RESET_STATE" });
    console.log("logged out and reset all data");
  }
);
