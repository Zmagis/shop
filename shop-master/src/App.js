import React from "react";
import { Route, Switch } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Register from "./components/forms/register/Register";
import Logout from "./components/logout/Logout";
import AddProduct from "./components/forms/addProduct/AddProduct";
import Admin from "./components/admin/Admin";
import Login from "./components/forms/login/Login";
import Home from "./components/home/Home";

import "./App.css";

function App(props) {
  let routes;
  props.isAuth
    ? (routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/admin" component={Admin} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      ))
    : (routes = (
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      ));

  return (
    <div className="App">
      <ul>
        <li className="NavigationItem">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="NavigationItem">
          <NavLink to="register">Register</NavLink>
        </li>
        <li className="NavigationItem">
          <NavLink to="login">Login</NavLink>
        </li>
        <li className="NavigationItem">
          <NavLink to="admin">Admin</NavLink>
        </li>
        <li className="NavigationItem">
          <NavLink to="addproduct">Add Product</NavLink>
        </li>
      </ul>
      {routes}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
