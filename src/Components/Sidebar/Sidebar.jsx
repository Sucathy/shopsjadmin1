import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef();
  let [menu, setMenu] = useState("shop");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpen
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        {/* <Route path="/menulist" element={<MenuPage />} /> */}
        {/* <MenuLists /> */}
        {/* <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <button
              className="link-btn"
              onClick={() => console.log("Account clicked")}
            >
              profile
            </button>
          </li>
        </Link> */}
        <h3>category</h3>
        <ul>
          <li
            onClick={() => {
              setMenu("addproduct");
            }}
          >
            <Link to="/addproduct" style={{ textDecoration: "none" }}>
              Add Product
            </Link>
            {menu === "addproduct" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("listproduct");
            }}
          >
            <Link to="/listproduct" style={{ textDecoration: "none" }}>
              Product List
            </Link>
            {menu === "listproduct" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("website");
            }}
          >
            <Link to="/website" style={{ textDecoration: "none" }}>
              Add WebSite change
            </Link>
            {menu === "website" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("/websitelist");
            }}
          >
            <Link to="/websitelist" style={{ textDecoration: "none" }}>
              WebSite changesList
            </Link>
            {menu === "/websitelist" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("/accountlist");
            }}
          >
            <Link to="/accountlist" style={{ textDecoration: "none" }}>
              Account Details
            </Link>
            {menu === "/accountlist" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("/orderlist");
            }}
          >
            <Link to="/orderlist" style={{ textDecoration: "none" }}>
              Order List
            </Link>
            {menu === "/orderlist" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("/userdetails");
            }}
          >
            <Link to="/userdetails" style={{ textDecoration: "none" }}>
              User details
            </Link>
            {menu === "/userdetails" ? <hr /> : <></>}
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
