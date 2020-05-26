import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import "./Home.css";
import ProductDetails from "./ProductDetails/ProductDetails";
import Product from "./Product";
import Backdrop from "../UI/backdrop/Backdrop";
import Spinner from "../UI/Spinner/Spinner";

const Home = (props) => {
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const { onFetchProducts } = props;
  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  const handleShow = (id) => {
    setShowProductDetails(true);
    const clicked = props.products.filter((item) => item.productId === id);
    setSelectedItem(clicked);
    console.log(clicked);
  };

  return (
    <div>
      {showProductDetails ? (
        <Backdrop width="95vw">
          <i
            className="fas fa-times leave-modal"
            onClick={() => setShowProductDetails(false)}
          ></i>
          <ProductDetails data={selectedItem[0]} />
        </Backdrop>
      ) : null}
      <h1>Home</h1>
      <div className="container">
        {!props.products ? (
          <Spinner />
        ) : (
          props.products.map((product, i) => (
            <Product
              key={i}
              id={product.productId}
              name={product.Name}
              img={product.img}
              price={product.Price}
              handleShow={handleShow}
            />
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.home.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.initFetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
