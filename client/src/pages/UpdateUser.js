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
      let fetchResult = await fetch(
        `http://localhost:5002/user/${reactCtx.id}`
      );
      console.log(fetchResult);
      const result = await fetchResult.json();
      setEmail(result.email);
      setPassword(result.password);
      setUsername(result.username);
      setBio(result.bio);
    };
    getPersonalDetails();
  }, [reactCtx.id]);

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
    let result = await fetch(`http://localhost:5002/user/${reactCtx.id}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        bio: bio,
      }),
    });
    const data = await result.json();
    console.log(data);
    if (data) {
      alert("Details updated");
      navigate("/home");
    }
  };

  return (
    <>
      <div>
        <h1>Update Personal Details</h1>
      </div>
      <form onSubmit={updatePersonal}>
        <div>
          <div>
            <label>Email </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                handleEmail(e);
              }}
            />
          </div>
          <div>
            <label>Password </label>
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                handlePassword(e);
              }}
            />
          </div>
          <div>
            <label>Username </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => {
                handleUsername(e);
              }}
            />
          </div>
          <div>
            <label>Bio </label>
            <input
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
          <button type="submit" onClick={updatePersonal}>
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateUser;
