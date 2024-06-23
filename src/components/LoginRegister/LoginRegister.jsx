// LoginRegister.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { AuthContext } from "../../AuthContext";
import "./LoginRegister.css";

const LoginRegister = () => {
  const [action, setAction] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setFormData({
      username: "",
      phone: "",
      email: "",
      password: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users", {
        nama_lengkap: formData.username,
        nomor_telepon: formData.phone,
        email: formData.email,
        password: formData.password,
        role: "user",
      });
      alert("Registration successful!");
      clearFormData(); // Clear form data after registration
      setAction("");
    } catch (error) {
      console.error("Error during registration", error);
      alert("Registration failed!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });
      login({
        token: response.data.access_token,
        role: response.data.role,
        username: response.data.username,
      });
      alert("Login successful!");
    } catch (error) {
      console.error("Error during login", error);
      alert("Login failed!");
    }
  };

  const registerLink = () => {
    clearFormData(); // Clear form data when switching to register form
    setAction(" active");
  };

  const loginLink = () => {
    clearFormData(); // Clear form data when switching to login form
    setAction("");
  };

  const buttonStyle = {
    width: "100%",
    height: "45px",
    background: "#613613",
    border: "none",
    outline: "none",
    borderRadius: "40px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    fontSize: "16px",
    color: "#fff",
    fontWeight: "700",
  };

  const buttonHoverStyle = {
    background: "#4b2810",
  };

  return (
    <div className="parent">
      <div className={`wrapper${action}`}>
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icon" />
            </div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.target.style.background = buttonHoverStyle.background)
              }
              onMouseOut={(e) =>
                (e.target.style.background = buttonStyle.background)
              }
            >
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <FaPhone className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icon" />
            </div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.target.style.background = buttonHoverStyle.background)
              }
              onMouseOut={(e) =>
                (e.target.style.background = buttonStyle.background)
              }
            >
              Register
            </button>
            <div className="login-link">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
