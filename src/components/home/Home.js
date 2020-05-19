import React from "react";

import box from "../../img/box.jpg";

const Home = () => {
  let products = [
    { title: "One", price: "453", img: box },
    { title: "Two", price: "453", img: box },
    { title: "Three", price: "453", img: box },
    { title: "Four", price: "453", img: box },
    { title: "Five", price: "453", img: box },
    { title: "Six", price: "453", img: box },
    { title: "Seven", price: "453", img: box },
    { title: "Eight", price: "453", img: box },
  ];

  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        {products.map((product) => (
          <div className="product">
            <img src={product.img} alt="" />
            <p>{product.title}</p>
            <p>Price {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
