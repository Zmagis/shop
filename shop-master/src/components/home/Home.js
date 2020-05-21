import React, { useState, useEffect } from "react";

import box from "../../img/box.jpg";

const Home = () => {
  // let products = [
  //   { title: "One", price: "453", img: box },
  //   { title: "Two", price: "453", img: box },
  //   { title: "Three", price: "453", img: box },
  //   { title: "Four", price: "453", img: box },
  //   { title: "Five", price: "453", img: box },
  //   { title: "Six", price: "453", img: box },
  //   { title: "Seven", price: "453", img: box },
  //   { title: "Eight", price: "453", img: box },
  // ];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((products) => {
        setProducts([...products]);
        console.log(products);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        {products.map((product, i) => (
          <div key={i} className="product">
            <img src={box} alt="" />
            <p>{product.idProducts}</p>
            <p>{product.Name}</p>
            <p>Price {product.Price}</p>
            <button key={product.idProducts}> Add to basket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
