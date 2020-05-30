import * as actionTypes from "./actionTypes";

export const addItemToBasket = (id) => {
  return { type: actionTypes.ADD_ITEM_TO_BASKET, id };
};
