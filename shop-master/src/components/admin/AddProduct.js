import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../UI/Input";
import * as actions from "../../store/actions";

const AddProduct = ({ setShow, onSendNew }) => {
  const [formData, setFormData] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Title",
      },
      value: "",
    },
    price: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Price",
      },
      value: "",
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Description",
      },
      value: "",
    },
    keywords: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Keywords",
      },
      value: "",
    },
  });

  const [file, setFile] = useState(null);

  const changeHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
  };

  const uploadImageHandler = (e) => {
    setFile(e.target.files[0]);
  };

  let today = new Date().toISOString().slice(0, 10);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    data.append("price", formData.price.value);
    data.append("keywords", formData.keywords.value);
    data.append("title", formData.title.value);
    data.append("description", formData.description.value);
    data.append("username", localStorage.username);
    data.append("date", today);
    onSendNew(data);
    setShow(false);
    setFile("");
  };

  const formElementArray = [];
  for (let key in formData) {
    formElementArray.push({ id: key, config: formData[key] });
  }

  return (
    <div>
      <h1>ADD</h1>
      <form method="POST" onSubmit={submitHandler}>
        {formElementArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changeHandler={
              element.config.elementConfig.type === "file"
                ? (e) => uploadImageHandler(e, element.id)
                : (e) => changeHandler(e, element.id)
            }
          />
        ))}

        <div className="upload-btn-wrapper">
          <button className={file !== null ? "uploaded btn" : "btn"}>
            Upload an image
          </button>
          <input
            type="file"
            name="image"
            onChange={(e) => uploadImageHandler(e)}
          />
        </div>

        <button type="submit">Add</button>
      </form>
      <br />
      {/* <i className="fab fa-500px"></i> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.admin.loding,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSendNew: (data) => dispatch(actions.initSentNewProduct(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
