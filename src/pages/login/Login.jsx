import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/a2srv-client/auth/login", {
        username: username,
        password: password,
      });
      const data = await response.data;
      // console.log(data.token)
      onLogin(data.token);
      setUsername("");
      setPassword("");
      setErrorMessage("");
    } catch (error) {
      console.log("Login error : ", error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      <div className="bg"></div>
      <form onSubmit={loginHandle} className="login">
        <img className="logo" src="/images/play-logo.png" alt="" />
        <h1 className="header">Login</h1>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Mobile Phone Number" />
        {/* <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/> */}
        <div className="password-container">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"} // Dynamic input type
            placeholder="Password"
          />
          <span className="password-toggle" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
          </span>
        </div>
        <div className="login-prop">
          <div className="checkbox">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a className="forgot-password" href="#">
            Forgot My Password
          </a>
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit" className="login-button">
          Continue
        </button>
      </form>
    </>
  );
};

export default Login;
