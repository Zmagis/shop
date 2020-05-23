import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import box from "../../img/box.jpg";

const Home = (props) => {
  const { onFetchProducts } = props;
  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("/api/product")
  //     .then((res) => res.json())
  //     .then((products) => {
  //       setProducts([...products]);
  //       console.log(products);
  //     });
  // }, []);
  console.log(props.prod);
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

const mapStateToProps = (state) => {
  return {
    prod: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.initFetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
