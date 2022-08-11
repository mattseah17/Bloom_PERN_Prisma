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
      <div class="absolute top-40 left-40">
        <h1 class="font-body text-5xl">Register an account</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div class="mb-5">
              <label class="mt-10 font-body2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email:{" "}
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="email"
                name="email"
                type="email"
                onChange={(e) => handleEmail(e)}
                placeholder="Your email"
                value={email}
                required
              />
            </div>
            <div class="mb-5">
              <label class="font-body2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Password:{" "}
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="password"
                name="password"
                type="text"
                onChange={(e) => handlePassword(e)}
                placeholder="Password"
                value={password}
                required
              />
            </div>
            <div class="mb-5">
              <label class="font-body2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Username:{" "}
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="userName"
                name="userName"
                type="text"
                onChange={(e) => handleName(e)}
                placeholder="Your name"
                value={username}
                required
              />
            </div>
            <div class="mb-5">
              <label class="mt-5 font-body2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Tell us about yourself:{" "}
              </label>
              <textarea
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="bio"
                name="bio"
                type="text"
                onChange={(e) => handleBio(e)}
                placeholder="About yourself"
                value={bio}
              />
            </div>
            <button class="font-body2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-8">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
