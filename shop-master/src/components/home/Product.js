import React from "react";

const Product = (props) => {
  const hidden =
    localStorage.getItem("username") === null ? null : { visibility: "hidden" };

  return (
    <div className="product">
      <div className="img-container">
        <img src={props.img} alt="" />
      </div>

      <div className="product-home-info">
        <div className="text">
          <h3>{props.name}</h3>
          <p>Price: {props.price} €</p>
        </div>

        <div className="icons">
          <div
            style={hidden}
            className="icon"
            onClick={() => props.handleAddToBasket(props.id)}
          >
            <i className="fas fa-shopping-basket"></i>
          </div>

          <div className="icon" onClick={() => props.handleShow(props.id)}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
