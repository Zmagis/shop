import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../Input";
import * as actions from "../../../store/actions";
import "../Form.css";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Username",
      },
      value: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
    },
  });

  const changeHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(formData.username.value, formData.password.value);
    console.log(props.isAuth);
  };

  const formElementArray = [];
  for (let key in formData) {
    formElementArray.push({ id: key, config: formData[key] });
  }

  return (
    <div>
      <h1>Login</h1>
      <form method="POST" onSubmit={submitHandler}>
        {formElementArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changeHandler={(e) => changeHandler(e, element.id)}
          />
        ))}
        {props.error ? <p className="error">{props.errorMsg}</p> : null}
        <button type="submit">Log In</button>
      </form>
      <p className="txt-center">
        Don't have an account? Register <a href="/register">here</a>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
