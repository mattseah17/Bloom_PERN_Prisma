import React, { useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reactCtx = useContext(ReactContext);
  const navigate = useNavigate();

  //handling changes
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const JSONData = JSON.stringify({
      email: email,
      password: password,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + reactCtx.access,
      },
      body: JSONData,
    };

    try {
      const res = await fetch("http://localhost:5002/user/login", options);
      console.log(res);
      console.log(options);

      const data = await res.json();
      // console.log(data);

      const access_token = data.access;
      console.log(access_token);
      const refresh_token = data.refresh;
      console.log(refresh_token);
      const id = data.id;
      console.log(id);

      reactCtx.setAccess(access_token);
      reactCtx.setRefresh(refresh_token);
      reactCtx.setLoginEmail(email);
      reactCtx.setId(id);
      reactCtx.setLoginState(true);

      navigate("/home");
      // alert("Logged in");
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1>Login to your account</h1>
      </div>
      <div>
        <form onSubmit={handleLogin}>
          <label>Email: </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmail}
            required
          />
          <br />
          <label>Password: </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
            required
          />
          <div>
            <button id="submit" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
