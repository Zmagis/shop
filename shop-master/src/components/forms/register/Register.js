import React, { useState } from "react";

import Input from "../Input";

const Register = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [conPassword, setConPassword] = useState("");
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
    passwordConfirmation: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password Confirmation",
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
  };

  const formElementArray = [];
  for (let key in formData) {
    formElementArray.push({ id: key, config: formData[key] });
  }

  return (
    <div>
      <h1>Register</h1>
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
