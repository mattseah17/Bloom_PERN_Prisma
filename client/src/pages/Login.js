import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateAuthContext } from "../context/AuthContext";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });

  function handleChange(e) {
    e.preventDefault();
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  }

  const login = useUpdateAuthContext().loginUser;
  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await login(input);
      if (response.user) {
        navigate("/user");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <h1>Login to your account</h1>
      </div>
      <div>
        <form onSubmit={loginUser}>
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={input.email}
                onChange={handleChange}
                autoFocus={true}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
