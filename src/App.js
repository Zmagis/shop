import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import AddProduct from "./components/addProduct/AddProduct";
import Login from "./components/login/Login";
import Home from "./components/home/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ul>
        <li className="NavigationItem">
          <NavLink to="register">Register</NavLink>
        </li>
        <li className="NavigationItem">
          <NavLink to="login">Login</NavLink>
        </li>
        <li className="NavigationItem">
          <NavLink to="logout">Logout</NavLink>
        </li>
        <li className="NavigationItem">
          <NavLink to="addproduct">Add Product</NavLink>
        </li>

        <li className="NavigationItem">
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/register" component={Register} /> //all
        <Route path="/logout" component={Logout} />
        <Route path="/addproduct" component={AddProduct} /> //admin
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} /> //all
      </Switch>
    </div>
  );
}

export default App;
