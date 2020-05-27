import React, { useState } from "react";
import axios from "axios";
import Input from "../forms/Input";

const AddPrduct = (props) => {
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
    image: {
      elementType: "input",
      elementConfig: {
        type: "file",
        // placeholder: "Keywords",
      },
      value: "",
      selectedFile: null,
    },
  });
  // const [file, setFile] = useState("");

  const changeHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
    console.log(e.target.value);
  };
  const uploadImageHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.selectedFile = e.target.files[0];
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
    console.log("uploadImageHandler");
    // setFile(e.target.files[0]);
  };
  // console.log(file);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:9000/addproduct", formData)
      .then((result) => {
        if (result.status === 200) {
          alert("prodcut added");
        } else if (result.status === 204) {
          alert("Product already exits");
        } else {
          console.log("some error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    props.setShow(false);
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

        {/* <div className="upload-btn-wrapper">
          <button className={file !== "" ? "uploaded btn" : "btn"}>
            Upload an image
          </button>
          <input
            // className={file !== "" ? "uploaded" : null}
            type="file"
            name="image"
            onChange={(e) => uploadImageHandler(e)}
          />
        </div> */}

        <button type="submit">Add</button>
      </form>
      <br />
      {/* <i className="fab fa-500px"></i> */}
    </div>
  );
};

export default AddPrduct;
