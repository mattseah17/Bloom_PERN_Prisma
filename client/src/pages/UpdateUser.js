import React, { useState, useEffect, useContext } from "react";
import ReactContext from "../context/reactcontext";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [password, setPassword] = useState();
  const reactCtx = useContext(ReactContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getPersonalDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + reactCtx.access,
        },
      };

      let fetchResult = await fetch(
        `http://localhost:5002/user/${reactCtx.id}`,
        options
      );
      const result = await fetchResult.json();
      setEmail(result.email);
      setPassword(result.password);
      setUsername(result.username);
      setBio(result.bio);
    };
    getPersonalDetails();
  }, []);

  //Handling changes
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };

  // Handling form update
  const updatePersonal = async (e) => {
    e.preventDefault();
    const result = await fetch(`http://localhost:5002/user/${reactCtx.id}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        email: email,
        username: username,
        bio: bio,
      }),
    });
    const data = await result.json();
    console.log(data);
    if (data) {
      navigate("/home");
    }
  };

  return (
    <>
      <div class="absolute top-40 left-40">
        <h1 class="font-body text-5xl">Update Personal Details</h1>
        <form onSubmit={updatePersonal}>
          <div>
            <div class="mb-3">
              <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                Email{" "}
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => {
                  handleEmail(e);
                }}
              />
            </div>
            <div class="mb-3">
              <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                Password{" "}
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  handlePassword(e);
                }}
              />
            </div>
            <div class="mb-3">
              <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                Username{" "}
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => {
                  handleUsername(e);
                }}
              />
            </div>
            <div class="mb-3">
              <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                Bio{" "}
              </label>
              <textarea
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="About yourself"
                name="address"
                value={bio}
                onChange={(e) => {
                  handleBio(e);
                }}
              />
            </div>
          </div>
          <div>
            <button
              class="font-body2 text-gray-100 bg-black border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-4"
              type="submit"
              onClick={updatePersonal}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
