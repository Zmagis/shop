import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../forms/Input";

import "./Navbar.css";

const Navbar = (props) => {
  // const [filter, setFilter] = useState({
  //   elementType: "select",
  //   elementConfig: {
  //     options: [
  //       { value: "All" },
  //       { value: "Clothes" },
  //       { value: "Shoes" },
  //       { value: "Books" },
  //       { value: "Other" },
  //     ],
  //   },
  //   value: "All",
  // });

  let links;
  props.auth
    ? (links = (
        <>
          {/* <li>
          </li> */}
          <li className="right">
            <NavLink to="admin">Admin</NavLink>
            <NavLink to="/logout">
              <i className="fas fa-shopping-basket"></i>
            </NavLink>
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
      {/* <Input
        elementType={filter.elementType}
        elementConfig={filter.elementConfig}
        value={filter.value}
      /> */}
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
