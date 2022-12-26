import { publicRequest } from "./requestMethod";
import {
  getProductStart,
  getProductSuccess,
  getProductFailed,
  getAdminProductStart,
  getAdminProductSuccess,
  getAdminProductFailed,
} from "../productSlice";
import {
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailFailed,
} from "../productDetailSlice";
import {
  newProductStart,
  newProductSuccess,
  newProductFailed,
} from "../newProductSlice";
import {
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailed,
} from "../deleteProduct";
import {
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
} from "../updateProductSlice";
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
  orderListStart,
  orderListSuccess,
  orderListFailed,
} from "../adminSlice/orderListSlice";
import {
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailed,
} from "../adminSlice/updateOrderSlice";
import {
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailed,
} from "../adminSlice/deleteOrderSlice";
import {
  allUserStart,
  allUserSuccess,
  allUserFailed,
} from "../adminSlice/allUserSlice";
import {
  userDetailStart,
  userDetailSuccess,
  userDetailFailed,
} from "../adminSlice/userDetailSilce";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} from "../adminSlice/updateUserSlice";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} from "../adminSlice/deleteUserSlice";
import {
  allReviewStart,
  allReviewSuccess,
  allReviewFailed,
} from "../adminSlice/productReviewSlice";

import {
  deleteReviewStart,
  deleteReviewSuccess,
  deleteReviewFailed,
} from "../adminSlice/deleteReviewSlice";
import {
  myOrdersRequest,
  myOrdersSucess,
  myOrdersFail,
} from "../myOrdersSlice";
import {
  orderDetailRequest,
  orderDetailSucess,
  orderDetailFail,
} from "../orderDetailSlice";
import { reviewRequest, reviewSucess, reviewFail } from "../reviewSlice";

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
  dispatch(updateProfileStart());
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await publicRequest.put(`/me/update`, userData, config);
    dispatch(updateProfileSuccess(data.success));
  } catch (error) {
    dispatch(updateProfileFailed(error.response.data.error));
  }
};

export const updatePassword = async (dispatch, passwords) => {
  dispatch(updatePasswordStart());
  try {
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
  dispatch(forgotPasswordStart());
  try {
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
  dispatch(resetPasswordStart());
  try {
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
  dispatch(createOrderRequest());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.post(`/order/new/`, order, config);
    dispatch(createOrderSucess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.error));
  }
};

export const myOrders = async (dispatch) => {
  dispatch(myOrdersRequest());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.get(`/orders/me`, config);
    dispatch(myOrdersSucess(data.orders));
  } catch (error) {
    dispatch(myOrdersFail(error.response.data.error));
  }
};

export const orderDetail = async (dispatch, id) => {
  dispatch(orderDetailRequest());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.get(`/order/${id}`, config);
    dispatch(orderDetailSucess(data.order));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.error));
  }
};

export const review = async (dispatch, reviewData) => {
  dispatch(reviewRequest());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.put(`/review`, reviewData, config);
    dispatch(reviewSucess(data.success));
  } catch (error) {
    dispatch(reviewFail(error.response.data.error));
  }
};

export const getAllProductforAdmin = async (dispatch) => {
  dispatch(getAdminProductStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.get(`/admin/products`, config);
    dispatch(getAdminProductSuccess(data.products));
  } catch (error) {
    dispatch(getAdminProductFailed(error.response.data.error));
  }
};

export const createProduct = async (dispatch, productData) => {
  dispatch(newProductStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.post(
      `/admin/product/new`,
      productData,
      config
    );
    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFailed(error.response.data.error));
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    const { data } = await publicRequest.delete(`/admin/product/${id}`);
    dispatch(deleteProductSuccess(data.success));
  } catch (error) {
    dispatch(deleteProductFailed(error.response.data.error));
  }
};

export const updateProduct = async (dispatch, id, productData) => {
  dispatch(updateProductStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.put(
      `/admin/product/${id}`,
      productData,
      config
    );
    dispatch(updateProductSuccess(data.success));
  } catch (error) {
    dispatch(updateProductFailed(error.response.data.error));
  }
};

export const getAllOrders = async (dispatch) => {
  dispatch(orderListStart());
  try {
    const { data } = await publicRequest.get(`/admin/orders`);
    dispatch(orderListSuccess(data.orders));
  } catch (error) {
    dispatch(orderListFailed(error.response.data.error));
  }
};

export const updateOrder = async (dispatch, id, order) => {
  dispatch(updateOrderStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.put(
      `/admin/order/${id}`,
      order,
      config
    );
    dispatch(updateOrderSuccess(data.success));
  } catch (error) {
    dispatch(updateOrderFailed(error.response.data.error));
  }
};

export const deleteOrder = async (dispatch, id) => {
  dispatch(deleteOrderStart());
  try {
    const { data } = await publicRequest.delete(`/admin/order/${id}`);
    dispatch(deleteOrderSuccess(data.success));
  } catch (error) {
    dispatch(deleteOrderFailed(error.response.data.error));
  }
};

export const getAllUsers = async (dispatch) => {
  dispatch(allUserStart());
  try {
    const { data } = await publicRequest.get(`/admin/users`);
    dispatch(allUserSuccess(data.users));
  } catch (error) {
    dispatch(allUserFailed(error.response.data.error));
  }
};

export const getUserDetails = async (dispatch, id) => {
  dispatch(userDetailStart());
  try {
    const { data } = await publicRequest.get(`/admin/users/${id}`);
    dispatch(userDetailSuccess(data.user));
  } catch (error) {
    dispatch(userDetailFailed(error.response.data.error));
  }
};

export const updateUser = async (dispatch, id, userData) => {
  dispatch(updateUserStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await publicRequest.put(
      `/admin/users/${id}`,
      userData,
      config
    );
    dispatch(updateUserSuccess(data.success));
  } catch (error) {
    dispatch(updateUserFailed(error.response.data.error));
  }
};

export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const { data } = await publicRequest.delete(`/admin/users/${id}`);
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailed(error.response.data.error));
  }
};

export const getAllReviews = async (dispatch, id) => {
  try {
    dispatch(allReviewStart());

    const { data } = await publicRequest.get(`/reviews?id=${id}`);

    dispatch(allReviewSuccess(data.reviews));
  } catch (error) {
    dispatch(allReviewFailed(error.response.data.error));
  }
};

export const deleteReviews = async (dispatch, reviewId, productId) => {
  try {
    dispatch(deleteReviewStart());

    const { data } = await publicRequest.delete(
      `/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch(deleteReviewSuccess(data.success));
  } catch (error) {
    dispatch(deleteReviewFailed(error.response.data.error));
  }
};
