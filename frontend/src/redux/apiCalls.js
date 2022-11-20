import {
  getProductStart,
  getProductSuccess,
  getProductFailed,
} from "./productSlice";
import { publicRequest, userRequest } from "./requestMethod";

export const getProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailed(error.response.data));
  }
};
