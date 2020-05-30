import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util";

const initialState = {
  basket: [],
};

const basket = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_BASKET:
      console.log(state.basket);
      let newArr = [...state.basket, action.id];
      localStorage.setItem("basket", JSON.stringify(newArr));
      return updateObject(state, { basket: newArr });
    default:
      return state;
  }
};

export default basket;
