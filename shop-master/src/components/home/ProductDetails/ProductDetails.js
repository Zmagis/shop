import React from "react";

import "./ProductDetails.css";

const ProductDetails = ({ data, children }) => {
  return (
    <div className="product-details">
      <img src={data.img} alt="" />
      <div className="info">
        <h2>{data.Name}</h2>
        <p>{data.description}</p>

        <div className="bottom">
          <div>
            <p>Price: {data.Price} €</p>
            <p>Views: ___</p>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
