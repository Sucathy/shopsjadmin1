import React, { useState } from "react";
import upload_area from "../Assets/upload_area.svg";
// import Sidebar from "../Sidebar/Sidebar";
import DashBoard from "../DashBorad/DashBoard";
import "./AddProduct.css";

const AddProduct = () => {
  const [image, setimage] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);
  const [image5, setimage5] = useState(false);
  const [image6, setimage6] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    // category: "women",
    new_price: "",
    old_price: "",
    category: "",
    tags: "",
    descriptions: "",
  });

  const AddProduct = async () => {
    let dataObj;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);
    formData.append("product", image2);
    formData.append("product", image3);
    formData.append("product", image4);
    formData.append("product", image5);
    formData.append("product", image6);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      product.image2 = dataObj.image2_url;
      product.image3 = dataObj.image3_url;
      product.image4 = dataObj.image4_url;
      product.image5 = dataObj.image5_url;
      product.image6 = dataObj.image6_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  };
  const imageHandler2 = (e) => {
    setimage2(e.target.files[0]);
  };
  const imageHandler3 = (e) => {
    setimage3(e.target.files[0]);
  };

  const imageHandler4 = (e) => {
    setimage4(e.target.files[0]);
  };

  const imageHandler5 = (e) => {
    setimage5(e.target.files[0]);
  };

  const imageHandler6 = (e) => {
    setimage6(e.target.files[0]);
  };

  return (
    <>
      <DashBoard />

      <div className="something">
        {/* <Sidebar /> */}
        <div className="addproduct">
          <div className="addproduct-itemfield">
            <p>Product title</p>
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={(e) => {
                changeHandler(e);
              }}
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                type="text"
                name="old_price"
                value={productDetails.old_price}
                onChange={(e) => {
                  changeHandler(e);
                }}
                placeholder="Type here"
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                type="text"
                name="new_price"
                value={productDetails.new_price}
                onChange={(e) => {
                  changeHandler(e);
                }}
                placeholder="Type here"
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Product category</p>
            <select
              name="category"
              value={productDetails.category}
              onChange={(e) => {
                changeHandler(e);
              }}
            >
              <option value="">Select an option</option>
              <option value="men">men</option>
              <option value="women">women</option>
              <option value="kid">kid</option>
              <option value="NewCollections">NewCollections</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <p>Product tags</p>
            <input
              type="text"
              name="tags"
              value={productDetails.tags}
              onChange={(e) => {
                changeHandler(e);
              }}
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-itemfield">
            <p>descriptions</p>
            <input
              type="text"
              name="descriptions"
              value={productDetails.descriptions}
              onChange={(e) => {
                changeHandler(e);
              }}
              placeholder="Type here descriptions"
            />
          </div>
          <div className="addproduct-itemfield">
            <p>Product Image</p>
            <label for="file-input">
              <img
                className="addproduct-thumbnail-img"
                src={!image ? upload_area : URL.createObjectURL(image)}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                imageHandler(e);
              }}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
          <div className="addproduct-itemfield">
            <p>Product colour Image</p>
            <label for="file-input2">
              <img
                className="addproduct-thumbnail-img"
                src={!image2 ? upload_area : URL.createObjectURL(image2)}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                imageHandler2(e);
              }}
              type="file"
              name="image2"
              id="file-input2"
              hidden
            />
            <label for="file-input3">
              <img
                className="addproduct-thumbnail-img"
                src={!image3 ? upload_area : URL.createObjectURL(image3)}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                imageHandler3(e);
              }}
              type="file"
              name="image3"
              id="file-input3"
              hidden
            />
            <label for="file-input4">
              <img
                className="addproduct-thumbnail-img"
                src={!image4 ? upload_area : URL.createObjectURL(image4)}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                imageHandler4(e);
              }}
              type="file"
              name="image4"
              id="file-input4"
              hidden
            />
            <label for="file-input5">
              <img
                className="addproduct-thumbnail-img"
                src={!image5 ? upload_area : URL.createObjectURL(image5)}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                imageHandler5(e);
              }}
              type="file"
              name="image5"
              id="file-input5"
              hidden
            />
            <label for="file-input6">
              <img
                className="addproduct-thumbnail-img"
                src={!image6 ? upload_area : URL.createObjectURL(image6)}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                imageHandler6(e);
              }}
              type="file"
              name="image6"
              id="file-input6"
              hidden
            />
          </div>
          <button
            className="addproduct-btn"
            onClick={() => {
              AddProduct();
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
