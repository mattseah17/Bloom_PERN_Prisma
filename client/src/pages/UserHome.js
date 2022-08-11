import React, { useEffect, useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import PlantArray from "../components/PlantArray";

const Userhome = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [bio, setBio] = useState("");
  const reactCtx = useContext(ReactContext);

  useEffect(() => {
    async function getUserInfo() {
      const url = `http://localhost:5002/user/${reactCtx.id}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${reactCtx.access}`,
        },
      };
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
        setUserPlants(data.posts);
        setBio(data.bio);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserInfo();
  }, [reactCtx.id, reactCtx.access]);

  return (
    <>
      <div class="absolute top-40 left-40">
        <div>
          <h1 class="font-body text-6xl font-bold text-yellow-800">
            My Dashboard
          </h1>
        </div>
        <div>
          <h2 class="font-body text-5xl font-bold mt-10">About Me</h2>
          <p class="text-lg text-gray-700 font-body2 mb-2 mt-2">{bio}</p>
          <h2 class="text-lg text-gray-700 font-body2 mb-2 mt-2">
            Contact me at {reactCtx.loginEmail}
          </h2>
        </div>
        <br />
        {userPlants.length === 0 ? (
          <h2 class="text-lg text-gray-700 font-body2 mb-2 mt-2">
            You have not added any plants
          </h2>
        ) : (
          <div>
            <PlantArray data={userPlants} />
          </div>
        )}
      </div>
    </>
  );
};

export default Userhome;
