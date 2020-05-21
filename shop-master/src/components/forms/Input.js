import React from "react";

const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
  }
  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
