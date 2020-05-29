import React, { useState } from "react";
import axios from "axios";

import "./Admin.css";

import AddProduct from "./AddProduct";
import Backdrop from "../UI/backdrop/Backdrop";
import ProductDetails from "../home/ProductDetails/ProductDetails";
import box from "../../img/box.jpg";
import boxFriend from "../../img/box-friend.jpg";
import out from "../../img/out.jpg";
import wooden from "../../img/wooden.jpg";
const data = [
  {
    productId: 1,
    Name: "One",
    Price: "453",
    image: box,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    productId: 2,
    Name: "Two",
    Price: "453",
    image: boxFriend,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    productId: 3,
    Name: "Three",
    Price: "453",
    image: out,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    productId: 4,
    Name: "Four",
    Price: "453",
    image: wooden,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const Admin = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");

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
      {data.map((item, i) => (
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

export default Admin;
