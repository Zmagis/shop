import React, { useState } from "react";
import axios from "axios"; //
import Input from "../Input";
import "../Form.css";



const Login = () => {
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
    console.log(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .post("http://localhost:9000/login", formData)
      .then( result => {
        if (result.status === 200) {
          alert("logged in");
        } else if (result.status === 204) {
          alert("password or username is incorect");
        } else {
         alert("username does not exits")
        }
      })
      .catch((err) => {
        console.error(err);
      });
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

        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? Register <a href="/register">here</a>
      </p>
    </div>
  );
};

export default Login;
