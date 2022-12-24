import { publicRequest, userRequest } from "./requestMethod";
import {
  getProductStart,
  getProductSuccess,
  getProductFailed,
} from "../productSlice";
import {
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailFailed,
} from "../productDetailSlice";
import {
  loginRequestStart,
  loginRequestSuccess,
  loginRequestFailed,
  registerRequestStart,
  registerRequestSuccess,
  registerRequestFailed,
  loadRequestStart,
  loadRequestSuccess,
  loadRequestFailed,
  logoutSuccess,
  logoutFailed,
} from "../userSlice";
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailed,
} from "../updateProfileSlice";
import {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailed,
} from "../forgotPassSlice";
import { addToCartItem, removeToCartItem, saveShipingInfo } from "../cartSlice";
import {
  createOrderRequest,
  createOrderSucess,
  createOrderFail,
} from "../orderSlice";
import {
  myOrdersRequest,
  myOrdersSucess,
  myOrdersFail,
} from "../myOrdersSlice";

export const getProduct = async (
  dispatch,
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0
) => {
  dispatch(getProductStart());
  try {
    let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const res = await publicRequest.get(link);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailed(error.response.data.error));
  }
};

export const getProductDetail = async (dispatch, id) => {
  dispatch(getProductDetailStart());
  try {
    const res = await publicRequest.get(`/product/${id}`);
    dispatch(getProductDetailSuccess(res.data));
  } catch (error) {
    dispatch(getProductDetailFailed(error.response.data.error));
  }
};

export const loginUser = async (dispatch, email, password) => {
  dispatch(loginRequestStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post(`/login`, { email, password }, config);
    dispatch(loginRequestSuccess(res.data.user));
  } catch (error) {
    dispatch(loginRequestFailed(error.response.data.error));
  }
};

export const registerUser = async (dispatch, userData) => {
  dispatch(registerRequestStart());
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await publicRequest.post(`/register`, userData, config);
    dispatch(registerRequestSuccess(res.data.user));
  } catch (error) {
    dispatch(registerRequestFailed(error.response.data.error));
  }
};

export const loadUser = async (dispatch) => {
  dispatch(loadRequestStart());
  try {
    const res = await publicRequest.get(`/me`);
    dispatch(loadRequestSuccess(res.data.user));
  } catch (error) {
    dispatch(loadRequestFailed(error.response.data.error));
  }
};

export const logout = async (dispatch) => {
  try {
    await publicRequest.get(`/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed(error.response.data.error));
  }
};

export const updateProfile = async (dispatch, userData) => {
  try {
    dispatch(updateProfileStart());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await publicRequest.put(`/me/update`, userData, config);
    dispatch(updateProfileSuccess(data.success));
  } catch (error) {
    dispatch(updateProfileFailed(error.response.data.error));
  }
};

export const updatePassword = async (dispatch, passwords) => {
  try {
    dispatch(updatePasswordStart());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.put(
      `/password/update`,
      passwords,
      config
    );
    dispatch(updatePasswordSuccess(data.success));
  } catch (error) {
    dispatch(updatePasswordFailed(error.response.data.error));
  }
};

export const forgotPassword = async (dispatch, email) => {
  try {
    dispatch(forgotPasswordStart());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.post(
      `/password/forgot`,
      email,
      config
    );
    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotPasswordFailed(error.response.data.error));
  }
};

export const resetPassword = async (dispatch, token, passwords) => {
  try {
    dispatch(resetPasswordStart());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.put(
      `/password/reset/${token}`,
      passwords,
      config
    );
    dispatch(resetPasswordSuccess(data.success));
  } catch (error) {
    dispatch(resetPasswordFailed(error.response.data.error));
  }
};

export const addItemsToCart = async (dispatch, id, quantity) => {
  const { data } = await publicRequest.get(`/product/${id}`);

  dispatch(
    addToCartItem({
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    })
  );
};

export const removeItemsFromCart = async (dispatch, id) => {
  dispatch(removeToCartItem(id));
};

export const saveShippingInfo = async (dispatch, data) => {
  dispatch(saveShipingInfo(data));
};

export const createOrder = async (dispatch, order) => {
  try {
    dispatch(createOrderRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.post(`/order/new/`, order, config);
    dispatch(createOrderSucess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.error));
  }
};

export const myOrders = async (dispatch) => {
  try {
    dispatch(myOrdersRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.get(`/orders/me`, config);
    dispatch(myOrdersSucess(data.orders));
  } catch (error) {
    dispatch(myOrdersFail(error.response.data.error));
  }
};
