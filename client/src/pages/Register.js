import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      username: username,
      bio: bio,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "http://localhost:5002/user/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
    navigate("/login");
  };

  return (
    <>
      <h1>Register an account</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <label>Email </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => handleEmail(e)}
              placeholder="Your email"
              value={email}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="text"
              onChange={(e) => handlePassword(e)}
              placeholder="Password"
              value={password}
              required
            />
          </div>
          <div>
            <label>Username</label>
            <input
              id="userName"
              name="userName"
              type="text"
              onChange={(e) => handleName(e)}
              placeholder="Your name"
              value={username}
              required
            />
          </div>
          <div>
            <label>Tell us about yourself</label>
            <input
              id="bio"
              name="bio"
              type="text"
              onChange={(e) => handleBio(e)}
              placeholder="About yourself"
              value={bio}
            />
          </div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default Register;
