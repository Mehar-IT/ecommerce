import {
  getProductStart,
  getProductSuccess,
  getProductFailed,
} from "./productSlice";
import { publicRequest, userRequest } from "./requestMethod";
import {
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailFailed,
} from "./productDetailSlice";

export const getProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
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
    console.log(error.response.data.error);

    dispatch(getProductDetailFailed(error.response.data.error));
  }
};
