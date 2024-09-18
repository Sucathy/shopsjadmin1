import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginn from "../Components/Assets/loginpage.jpg";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    otp: "", // Added for OTP handling
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let dataObj;
    await fetch("http://localhost:4000/adminlogin", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });
    console.log(dataObj);
    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      navigate("/admin");
    } else {
      alert(dataObj.errors);
    }
  };

  const signup = async () => {
    let dataObj;
    await fetch("http://localhost:4000/adminsignup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/loginsignup");
    } else {
      alert(dataObj.errors);
    }
  };

  const requestOtp = async () => {
    const response = await fetch("http://localhost:4000/requestotp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email }),
    });
    const data = await response.json();
    if (data.success) {
      alert("OTP sent to your email.");
      setState("Enter OTP");
    } else {
      alert(data.errors);
    }
  };

  const resetPassword = async () => {
    const response = await fetch("http://localhost:4000/resetpassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        otp: formData.otp,
        password: formData.password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Password reset successful.");
      setState("Login");
    } else {
      alert(data.errors);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="loginnn">
          <h4>ShopSJ</h4> <img src={loginn} alt="Shop Logo" />
        </div>
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {(state === "Sign Up" ||
            state === "Login" ||
            state === "Forgot Password") && (
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
          )}

          {state !== "Forgot Password" && (
            <FormControl
              sx={{
                m: 1,
                width: {
                  xs: "100%", // Full width for extra small screens (phones)
                  sm: "70ch", // Slightly wider for small screens (tablets)
                  md: "45ch", // Default width for medium and larger screens (desktops)
                },
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        backgroundColor: "#f0f0f0", // Light grey background
                        color: "#1976d2", // Primary color
                        "&:hover": {
                          backgroundColor: "#e0e0e0", // Darker grey on hover
                        },
                        padding: {
                          xs: "20px", // Smaller padding for phones
                          sm: "20px", // Medium padding for tablets
                          md: "25px", // Default padding for desktops
                        }, // Custom padding
                        borderRadius: "50%", // Rounded corners
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </FormControl>
          )}

          {state === "Enter OTP" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={changeHandler}
              />
              <input
                type="password"
                placeholder="New Password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </>
          )}
        </div>

        <button
          onClick={() => {
            state === "Login"
              ? login()
              : state === "Sign Up"
              ? signup()
              : state === "Forgot Password"
              ? requestOtp()
              : resetPassword();
          }}
        >
          Continue
        </button>

        {state === "Login" ? (
          <>
            <p className="loginsignup-login">
              Forgot password?{" "}
              <span
                onClick={() => {
                  setState("Forgot Password");
                }}
              >
                Click here
              </span>
            </p>
          </>
        ) : state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          state === "Forgot Password" && (
            <p className="loginsignup-login">
              Remembered your password?{" "}
              <span
                onClick={() => {
                  setState("Login");
                }}
              >
                Login here
              </span>
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
