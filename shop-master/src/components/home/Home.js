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

  const [idBasket, setIdBasket] = useState("");
  const [basketArr, setBasketArr] = useState([]);

  const { onFetchProducts } = props;
  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  useEffect(() => {
    console.log(idBasket);
    if (idBasket !== "") {
      setBasketArr([...basketArr, idBasket]);
      localStorage.setItem("basket", JSON.stringify(basketArr));
    }
  }, [idBasket, basketArr]);
  console.log(localStorage.getItem("basket"));

  const handleShow = (id) => {
    setShowProductDetails(true);
    const clicked = props.products.filter((item) => item.idProducts === id);
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
          <ProductDetails data={selectedItem[0]}>
            <i className="fas fa-shopping-basket icon"></i>
            <i className="far fa-credit-card icon"></i>
          </ProductDetails>
        </Backdrop>
      ) : null}
      <h1>Home</h1>
      <div className="container">
        {props.loading ? (
          <Spinner />
        ) : !props.products ? (
          <p>Nothing for sale yet</p>
        ) : (
          props.products.map((product, i) => (
            <Product
              key={i}
              id={product.idProducts}
              name={product.Name}
              img={product.image}
              price={product.Price}
              user={product.user}
              date={product.date}
              handleShow={handleShow}
              setIdBasket={setIdBasket}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.initFetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// // route to get product
// axios.get(`/api/product`).then((res) => {
//   const product = res.data;
//   console.log(product);
// });
