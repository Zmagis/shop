import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import * as actions from "../../store/actions";

import "./Basket.css";
import Stripe from "stripe";

const Basket = ({ products, onFetchProducts, onRemoveItemFromBasket }) => {
  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  let filteredArr;
  let filteredItems;
  let total = 0;

  let ids = localStorage.getItem("basket");

  const makePayment = (token) => {
    const body = {
      token,
      //product
    };
    axios.post("/payment", body).then((result) => {
      if (result.status === 200) {
        alert("success");
      } else {
        console.log("some error");
      }
    });
  };

  const removeHandler = (id) => {
    onRemoveItemFromBasket(id);
    // console.log(id);
  };

  if (ids !== null) {
    filteredArr = products.filter((item) => ids.includes(item.idProducts));

    filteredArr.map((item) => {
      total = total + item.Price;
    });

    filteredItems =
      filteredArr.length === 0 ? (
        <p style={{ textAlign: "center", lineHeight: "40px" }}>
          No products in your basket yet!
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th style={{ border: "1px solid rgba(0, 0, 0, 0.185)" }}>
                Price, €
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArr.map((product) => (
              <tr key={product.idProducts}>
                <td>
                  <img src={product.image} alt="/" />
                </td>
                <td>
                  <h4>{product.Name}</h4>
                </td>
                <td>
                  <p>{product.Price}</p>
                </td>
                <td style={{ border: "1px solid transparent" }}>
                  <i
                    className="fas fa-minus remove"
                    onClick={() => removeHandler(product.idProducts)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td>Total: {total} €</td>
            </tr>
          </tfoot>
        </table>
      );
  }

  return (
    <div className="basket">
      <h1>Basket</h1>
      {filteredItems}
      {filteredArr.length === 0 ? null : (
        <StripeCheckout
          stripeKey="pk_test_OtPH56R0K9McMN5SdhabDEKC"
          token={makePayment}
          name="testas"
          amount="10*10"
          shippingAddress
          billingAddress
        >
          <button style={{ marginTop: "20px" }}> Pay now</button>
        </StripeCheckout>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.home.products,
    loading: state.home.loding,
    basket: state.basket.basket,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.initFetchProducts()),
    onRemoveItemFromBasket: (id) => dispatch(actions.removeItemFromBasket(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
