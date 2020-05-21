import React from "react";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Register from "./components/forms/register/Register";
import Logout from "./components/logout/Logout";
import AddProduct from "./components/forms/addProduct/AddProduct";
import Login from "./components/forms/login/Login";
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
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
