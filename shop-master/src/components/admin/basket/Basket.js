import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
// import StripeCheckout from 'react-stripe-checkout';

import * as actions from "../../../store/actions";

import "./Basket.css";
import Stripe from "stripe";

const Basket = ({ products, onFetchProducts }) => {
  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);
  console.log(products);

  let filteredArr;
  let filteredItems;
  let total;

  console.log(localStorage.getItem("basket"));
  let ids = localStorage.getItem("basket");

  const makePayment = (token) => {
    const body = {
      token,
      //product
    };
    axios.post("http://localhost:9000/payment", body).then((result) => {
      if (result.status === 200) {
        alert("success");
      } else {
        console.log("some error");
      }
    });
  };

  if (ids !== null) {
    filteredArr = products.filter((item) => ids.includes(item.idProducts));

    //total = filteredArr.reduce((acc, curr) => acc + curr);
    //console.log(total);

    filteredItems = filteredArr.map((product) => (
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
      </tr>
    ));
  }

  return (
    <div className="basket">
      <h1>Basket</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Price, €</th>
          </tr>
        </thead>
        <tbody>{filteredItems}</tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>Total:__</td>
          </tr>
          {/* <StripeCheckout
          stripeKey="pk_test_OtPH56R0K9McMN5SdhabDEKC"
          token={makePayment}
          name="testas"
          amount="10*10"
          shippingAddress
          billingAddress
          >
            <button> Pay now</button>
          </StripeCheckout> */}
        </tfoot>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.home.products,
    loading: state.home.loding,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.initFetchProducts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
