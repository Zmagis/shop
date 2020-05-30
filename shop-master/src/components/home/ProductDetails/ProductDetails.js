import React from "react";

import "./ProductDetails.css";

const ProductDetails = ({ data, children }) => {
  console.log(data);
  return (
    <div className="product-details">
      <img src={data.image} alt="" />
      <div className="info">
        <h2>{data.Name}</h2>
        <p>{data.Description}</p>

        <div className="bottom">
          <div>
            <p>Price: {data.Price} €</p>
            <p>By: {data.user}</p>
            <p>Posted: {data.date}</p>
            <br />
            <p>Viewed by: ___</p>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
