import React, { useState } from "react";
import upload_area from "../Assets/upload_area.svg";
import DashBoard from "../DashBorad/DashBoard";

const Website = () => {
  const [webImages, setWebImages] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [websiteDetails, setWebsiteDetails] = useState({
    webname: "",
    webnew_price: "",
    webold_price: "",
    webcategory: "",
    webtags: "",
    webdescriptions: "",
  });

  const handleImageChange = (index) => (e) => {
    const newImages = [...webImages];
    newImages[index] = e.target.files[0];
    setWebImages(newImages);
  };

  const handleChange = (e) => {
    setWebsiteDetails({ ...websiteDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const formData = new FormData();
    webImages.forEach((image, index) => {
      if (image) formData.append("website", image);
    });

    const response = await fetch("http://localhost:4000/website", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      const updatedWebsiteDetails = {
        ...websiteDetails,
        webimage1: data.webimage1_url,
        webimage2: data.webimage2_url,
        webimage3: data.webimage3_url,
        webimage4: data.webimage4_url,
        webimage5: data.webimage5_url,
        webimage6: data.webimage6_url,
      };

      const result = await fetch("http://localhost:4000/addwebsite", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWebsiteDetails),
      });

      const resultData = await result.json();
      alert(resultData.success ? "Product Added" : "Failed");
    }
  };

  return (
    <>
      <DashBoard />
      <div className="something">
        {/* <Sidebar /> */}
        <div className="addproduct">
          <div className="addproduct-itemfield">
            <h2> Website change </h2>
            <p>Product title</p>
            <input
              type="text"
              name="webname"
              value={websiteDetails.webname}
              onChange={handleChange}
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                type="text"
                name="webold_price"
                value={websiteDetails.webold_price}
                onChange={handleChange}
                placeholder="Type here"
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                type="text"
                name="webnew_price"
                value={websiteDetails.webnew_price}
                onChange={handleChange}
                placeholder="Type here"
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Product category</p>
            <select
              name="webcategory"
              value={websiteDetails.webcategory}
              onChange={handleChange}
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
              name="webtags"
              value={websiteDetails.webtags}
              onChange={handleChange}
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-itemfield">
            <p>Description</p>
            <input
              type="text"
              name="webdescriptions"
              value={websiteDetails.webdescriptions}
              onChange={handleChange}
              placeholder="Type here descriptions"
            />
          </div>
          <div className="addproduct-itemfield">
            <p>Product Images</p>
            {webImages.map((image, index) => (
              <div key={index} className="addproduct-itemfield">
                <label htmlFor={`file-input${index}`}>
                  <img
                    className="addproduct-thumbnail-img"
                    src={!image ? upload_area : URL.createObjectURL(image)}
                    alt={`Upload Preview ${index + 1}`}
                  />
                </label>
                <input
                  type="file"
                  id={`file-input${index}`}
                  hidden
                  onChange={handleImageChange(index)}
                />
              </div>
            ))}
          </div>
          <button className="addproduct-btn" onClick={addProduct}>
            ADD
          </button>
        </div>
      </div>
    </>
  );
};

export default Website;
