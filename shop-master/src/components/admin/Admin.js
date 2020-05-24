import React, { useState } from "react";

import AddProduct from "./AddProduct";
import Backdrop from "../UI/backdrop/Backdrop";

const Admin = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div>
      {showAddForm ? (
        <Backdrop>
          <i className="fas fa-times leave-modal" onClick={handleAddForm}></i>
          <AddProduct setShow={setShowAddForm} />
        </Backdrop>
      ) : null}
      <h1>Admin</h1>
      <i className="fas fa-plus" onClick={handleAddForm}></i>
      <p>this is where admin can see all his products</p>
      <p> also admin can see how many views has each of his product</p>
      <p>maybe other statistic</p>
    </div>
  );
};

export default Admin;
