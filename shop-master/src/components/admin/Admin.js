import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions";

import "./Admin.css";

import AddProduct from "./AddProduct";
import Backdrop from "../UI/backdrop/Backdrop";
import ProductDetails from "../home/ProductDetails/ProductDetails";

const Admin = (props) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");

  const { onFetchProducts } = props;

  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  let filteredArr;
  if (props.products !== 0) {
    console.log("hi");
    let array = [...props.products];

    filteredArr = array.filter(
      (item) => item.user === localStorage.getItem("username")
    );
  }

  const handleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = (id, name) => {
    console.log(`delete ${id}`);
    setShowConfirmDelete(true);
    setDeleteTitle(name);
    setDeleteId(id);
  };
  const confirmDelete = () => {
    console.log(`confirmed ${deleteId}`);
    axios.delete("/delete", {
      data: { id: deleteId },
    });
    setShowConfirmDelete(false);
  };

  return (
    <div>
      {showAddForm ? (
        <Backdrop width="600px">
          <i className="fas fa-times leave-modal" onClick={handleAddForm}></i>
          <AddProduct setShow={setShowAddForm} />
        </Backdrop>
      ) : null}
      {showConfirmDelete ? (
        <Backdrop width="500px">
          <i
            className="fas fa-times leave-modal"
            onClick={() => setShowConfirmDelete(false)}
          ></i>
          <p>Are you sure want to delete {deleteTitle}?</p>
          <button onClick={confirmDelete}>Delete</button>
        </Backdrop>
      ) : null}

      <h1>
        Add more items for sell{" "}
        <span>
          <i
            className="fas fa-plus"
            style={{ cursor: "pointer", color: "grey", marginLeft: "10px" }}
            onClick={handleAddForm}
          ></i>
        </span>
      </h1>
      {filteredArr.map((item, i) => (
        <div key={i} className="box">
          <ProductDetails data={item}>
            <i
              className="far fa-edit icon"
              onClick={() => console.log(item.productId)}
            ></i>
            <i
              className="far fa-trash-alt icon"
              onClick={() => handleDelete(item.productId, item.Name)}
            ></i>
          </ProductDetails>
        </div>
      ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
