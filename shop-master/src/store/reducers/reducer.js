import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util";
import box from "../../img/box.jpg";

const initialState = {
  isAuthenticated: true,
  products: [
    { title: "One", price: "453", img: box },
    { title: "Two", price: "453", img: box },
    { title: "Three", price: "453", img: box },
    { title: "Four", price: "453", img: box },
    { title: "Five", price: "453", img: box },
    { title: "Six", price: "453", img: box },
    { title: "Seven", price: "453", img: box },
    { title: "Eight", price: "453", img: box },
  ],
  // loading will be set to true while fetching products
  // (this will help to show spinner when needed)
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return updateObject(state, { loading: true, error: false });
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return updateObject(state, {
        products: action.products,
        loading: false,
        error: false,
      });
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return updateObject(state, { loading: false, error: true });
    default:
      return state;
  }
};

export default reducer;
