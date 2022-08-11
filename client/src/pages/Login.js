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
      <div class="absolute top-40 left-40">
        <h1 class="font-body text-5xl">Login to your account</h1>
        <form onSubmit={handleLogin}>
          <div class="mb-5">
            <label class="mt-10 font-body2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Email:{" "}
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div class="mb-5">
            <label class="mt-10 font-body2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Password:{" "}
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <button
            class="font-body2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-3"
            id="submit"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
