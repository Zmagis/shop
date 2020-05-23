import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Navbar.css";

const Navbar = (props) => {
  console.log(props.auth);
  let links;
  props.auth
    ? (links = (
        <>
          <li>
            <NavLink to="admin">Admin</NavLink>
          </li>
          <li>
            <NavLink to="addproduct">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="addproduct">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/">Log Out</NavLink>
          </li>
        </>
      ))
    : (links = (
        <>
          <li>
            <NavLink to="login">Login</NavLink>
          </li>
          <li>
            <NavLink to="register">Register</NavLink>
          </li>
        </>
      ));
  return (
    <ul>
      <li className="NavigationItem">
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      {links}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Navbar);
