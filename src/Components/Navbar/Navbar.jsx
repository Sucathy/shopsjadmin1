import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // let [menu, setMenu] = useState("shop");
  return (
    <>
      <div className="navbar">
        {/* <img src={navlogo} className="nav-logo" alt="" /> */}
        <h1>ShopSJ</h1>
        <div className="nav-login-register">
          <ul>
            <li>
              <Link to="/loginsignup" style={{ textDecoration: "none" }}>
                <button style={{ borderRadius: "30%", fontSize: "23px" }}>
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/loginsignup" style={{ textDecoration: "none" }}>
                <button style={{ borderRadius: "30%", fontSize: "23px" }}>
                  logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
        {/* <img src={navprofileIcon} className="nav-profile" alt="" /> */}
      </div>
    </>
  );
};

export default Navbar;
