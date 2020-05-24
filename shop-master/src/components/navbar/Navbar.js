import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Navbar.css";

const Navbar = (props) => {
  let links;
  props.auth
    ? (links = (
        <>
          <li>
            <NavLink to="admin">Admin</NavLink>
          </li>
          <li className="right">
            <NavLink to="/logout">
              <i className="fas fa-sign-out-alt"></i>
            </NavLink>
          </li>
        </>
      ))
    : (links = (
        <>
          <li className="right">
            <NavLink to="login">Login</NavLink>
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
