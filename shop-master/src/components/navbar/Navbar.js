import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import "./Navbar.css";

const Navbar = (props) => {
  const handleLogout = () => {
    props.onLogout();
  };

  let links;
  // props.auth ||
  localStorage.getItem("username") !== null
    ? (links = (
        <>
          <li className="right">
            <NavLink to="admin">Admin</NavLink>
            <NavLink to="/logout">
              <i className="fas fa-shopping-basket"></i>
            </NavLink>
            <NavLink to="/logout">
              <i className="fas fa-sign-out-alt" onClick={handleLogout}></i>
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
    auth: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
