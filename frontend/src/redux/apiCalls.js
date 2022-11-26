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
