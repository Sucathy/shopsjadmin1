import { Drawer } from "@mui/material";
import React, { useRef, useState } from "react";
import logo from "../Assets/logo2.jpeg";
import "./DashBoard.css";

import { Link } from "react-router-dom";
import menu_icon from "../Assets/menuicon2 copy.svg";
function DashBoard() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("");
  const menuRef = useRef(null);

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(state);
  };

  const DrawerList = (
    <ul ref={menuRef} className="nav-menu">
      <li
        className={`drawer-item ${menu === "addproduct" ? "active" : ""}`}
        onClick={() => setMenu("addproduct")}
      >
        <Link to="/addproduct" style={{ textDecoration: "none" }}>
          Add Product
        </Link>
        {menu === "addproduct" && <hr />}
      </li>
      <li
        className={`drawer-item ${menu === "/listproduct" ? "active" : ""}`}
        onClick={() => setMenu("/listproduct")}
      >
        <Link to="/listproduct" style={{ textDecoration: "none" }}>
          Product List
        </Link>
        {menu === "/listproduct" && <hr />}
      </li>
      <li
        className={`drawer-item ${menu === "/website" ? "active" : ""}`}
        onClick={() => setMenu("/website")}
      >
        <Link to="/website" style={{ textDecoration: "none" }}>
          Add WebSite change
        </Link>
        {menu === "/website" && <hr />}
      </li>
      <li
        className={`drawer-item ${menu === "websitelist" ? "active" : ""}`}
        onClick={() => setMenu("websitelist")}
      >
        <Link to="/websitelist" style={{ textDecoration: "none" }}>
          WebSite changesList
        </Link>
        {menu === "websitelist" && <hr />}
      </li>
      <li
        className={`drawer-item ${menu === "/accountlist" ? "active" : ""}`}
        onClick={() => setMenu("/accountlist")}
      >
        <Link to="/accountlist" style={{ textDecoration: "none" }}>
          Account Details
        </Link>
        {menu === "/accountlist" && <hr />}
      </li>
      <li
        className={`drawer-item ${menu === "/orderlist" ? "active" : ""}`}
        onClick={() => setMenu("/orderlist")}
      >
        <Link to="/orderlist" style={{ textDecoration: "none" }}>
          Order List
        </Link>
        {menu === "/orderlist" && <hr />}
      </li>
      <li
        className={`drawer-item ${menu === "/userdetails" ? "active" : ""}`}
        onClick={() => setMenu("/userdetails")}
      >
        <Link to="/userdetails" style={{ textDecoration: "none" }}>
          User details
        </Link>
        {menu === "/userdetails" && <hr />}
      </li>
    </ul>
  );

  return (
    <div className="nav">
      <button className="menu-btn" onClick={toggleDrawer(true)}>
        <img className="menu-btnicon" src={menu_icon} alt="Menu" />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Link
        to="/addproduct"
        onClick={() => {
          setMenu("shop");
        }}
        style={{ textDecoration: "none" }}
        className="nav-logo"
      >
        <img src={logo} alt="logo" />
        {/* <p>ShopSJ</p> */}
      </Link>
    </div>
  );
}

export default DashBoard;
