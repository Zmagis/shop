import React, { useState } from "react";
import axios from "axios";
import Input from "../UI/Input";
import Backdrop from "../UI/backdrop/Backdrop";

const EditPrduct = (props) => {
  console.log(props.data);
  const [formData, setFormData] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Title",
      },
      value: props.data.Name,
      label: "Edit title:",
    },
    price: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Price",
      },
      value: props.data.Price,
      label: "Edit price:",
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Description",
      },
      value: props.data.Description,
      label: "Edit description:",
    },
    keywords: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Keywords",
      },
      value: props.data.Keywords,
      label: "Edit Keywords",
    },
  });

  const [file, setFile] = useState(props.data.image);

  const changeHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
    console.log(e.target.value);
  };

  const uploadImageHandler = (e) => {
    setFile(e.target.files[0]);
  };

  console.log(file);
  let today = new Date().toISOString().slice(0, 10);
  console.log(today);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(file);
    console.log(formData);
    const data = new FormData();
    data.append("image", file);
    data.append("price", formData.price.value);
    data.append("keywords", formData.keywords.value);
    data.append("title", formData.title.value);
    data.append("description", formData.description.value);
    data.append("id", props.data.idProducts);
    data.append("username", localStorage.username);
    data.append("date", today);
    console.log(data);
    axios
      .post("/editproduct", data)
      .then((result) => {
        if (result.status === 200) {
          alert("prodcut updated");
        } else if (result.status === 204) {
          alert("product not exits");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    props.setShowEdit(false);
  };

  const formElementArray = [];
  for (let key in formData) {
    formElementArray.push({ id: key, config: formData[key] });
  }

  return (
    <Backdrop width="600px">
      <div>
        <i
          className="fas fa-times leave-modal"
          onClick={() => props.setShowEdit(false)}
        ></i>

        <h1>Edit</h1>
        <form method="PUT" onSubmit={submitHandler}>
          {formElementArray.map((element) => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              label={element.config.label}
              changeHandler={
                element.config.elementConfig.type === "file"
                  ? (e) => uploadImageHandler(e, element.id)
                  : (e) => changeHandler(e, element.id)
              }
            />
          ))}

          <div className="upload-btn-wrapper">
            <label>Change photo:</label>
            <button className={file !== null ? "uploaded btn" : "btn"}>
              Upload an image
            </button>
            <input
              type="file"
              name="image"
              onChange={(e) => uploadImageHandler(e)}
            />
          </div>

          <button type="submit">Edit</button>
        </form>
        <br />
        <i className="fab fa-500px"></i>
      </div>
    </Backdrop>
  );
};

export default EditPrduct;
