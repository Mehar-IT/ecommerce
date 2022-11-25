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

export const getProduct = async (dispatch, keyword = "", currentPage = 1) => {
  dispatch(getProductStart());
  try {
    let link = `/products?keyword=${keyword}&page=${currentPage}`;
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
