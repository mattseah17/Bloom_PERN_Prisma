import React, { useState, useContext } from "react";
import ReactContext from "../context/react-context";
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

  const handleLogin = async () => {
    const bod = JSON.stringify({
      email: email,
      password: password,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
      body: bod,
    };
    try {
      const res = await fetch("http://localhost:5002/user/login", options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        window.alert("Please Register");
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      // setData(data);
      console.log(data); // this returns both access and refresh tokens as part of the data object
      const access_token = data.access;
      const refresh_token = data.refresh;
      console.log(access_token);
      console.log(refresh_token);
      reactCtx.setAccess(access_token);
      reactCtx.setRefresh(refresh_token);
      reactCtx.setLoginEmail(email);
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
          <br></br>
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
