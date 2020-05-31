import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util";

const initialState = {
  basket: [],
};

const basket = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_BASKET:
      console.log("init");
      let restore = JSON.parse(localStorage.getItem("basket"));
      console.log(restore);
      return updateObject(state, { basket: restore });
    case actionTypes.ADD_ITEM_TO_BASKET:
      console.log(localStorage.getItem("basket"));
      let newArr = [...state.basket, action.id];
      localStorage.setItem("basket", JSON.stringify(newArr));
      return updateObject(state, { basket: newArr });
    case actionTypes.REMOVE_ITEM_FROM_BASKET:
      console.log("remove" + action.id);
      let nArr = [...state.basket];
      console.log(nArr);
      let removed = nArr.filter((id) => id !== action.id);
      console.log(removed);
      localStorage.setItem("basket", JSON.stringify(removed));
      return updateObject(state, { basket: removed });
    default:
      return state;
  }
};

export default basket;
