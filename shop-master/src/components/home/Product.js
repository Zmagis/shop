import React from "react";

const Product = (props) => {
  return (
    <div className="product">
      <div className="img-container">
        <img src={props.img} alt="" />
      </div>

      <div className="product-home-info">
        <div className="text">
          <h3>{props.name}</h3>
          <p>Price: {props.price} €</p>
          <p>Posted: {props.date}</p>
          <p>By: {props.user}</p>
        </div>

        <div className="icons">
          <div className="icon">
            <i
              className="fas fa-shopping-basket"
              onClick={() => props.handleAddToBasket(props.id)}
              // key={product.idProducts}
            ></i>
          </div>
          <div className="icon">
            <i
              className="fas fa-arrow-right"
              onClick={() => props.handleShow(props.id)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
