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

  if (localStorage.getItem("basket") === null) {
    localStorage.setItem("basket", []);
  }

  const handleAddToBasket = (id) => {
    if (!localStorage.getItem("basket").includes(id)) {
      console.log("add");
      props.onAddToBasket(id);
    } else {
      console.log("already there");
    }
  };

  const handleShow = (id) => {
    setShowProductDetails(true);
    const clicked = props.products.filter((item) => item.idProducts === id);
    setSelectedItem(clicked);
    console.log(clicked);
  };
  const hidden =
    localStorage.getItem("username") === null ? null : { visibility: "hidden" };
  return (
    <div>
      {showProductDetails ? (
        <Backdrop width="95vw">
          <i
            className="fas fa-times leave-modal"
            onClick={() => setShowProductDetails(false)}
          ></i>
          <ProductDetails data={selectedItem[0]}>
            <i
              style={hidden}
              className="fas fa-shopping-basket icon"
              onClick={() => handleAddToBasket(selectedItem[0].idProducts)}
            ></i>
            <i style={hidden} className="far fa-credit-card icon"></i>
          </ProductDetails>
        </Backdrop>
      ) : null}

      <h1>Home</h1>
      <div className="container">
        {props.loading ? (
          <Spinner />
        ) : props.products.length === 0 ? (
          <p>Nothing for sale yet</p>
        ) : (
          props.products.map((product, i) => (
            <Product
              key={i}
              id={product.idProducts}
              name={product.Name}
              img={product.image}
              price={product.Price}
              handleShow={handleShow}
              handleAddToBasket={handleAddToBasket}
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
    loading: state.home.loding,
    basket: state.basket.basket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.initFetchProducts()),
    onAddToBasket: (id) => dispatch(actions.addItemToBasket(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
