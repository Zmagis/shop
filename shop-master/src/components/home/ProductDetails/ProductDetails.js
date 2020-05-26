import React from "react";

import "./ProductDetails.css";

const ProductDetails = ({ data }) => {
  return (
    <div className="product-details">
      <img src={data.img} alt="" />
      <div className="info">
        <h2>{data.Name}</h2>
        <p>{data.description}</p>

        <div className="bottom">
          <p>Price: {data.Price} €</p>
          <div>
            <i className="fas fa-shopping-basket icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
