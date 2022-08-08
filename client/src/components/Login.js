import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateAuthContext } from "../contexts/AuthContext";

const Login = () => {
  //states for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useUpdateAuthContext().loginUser;
  const navigate = useNavigate()

  //handling changes
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  };
  
  return (
    <>
      <div>
        <h1>Login to your account</h1>
      </div>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={handleEmail}
          required
        />
        <br></br>
        <label>Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={handlePassword}
          required
        />
        <div>
          <button id="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
