import React, { useEffect, useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import PlantCards from "../components/Results";

const Userhome = () => {
  const [userData, setUserData] = useState([]);
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
        setUserData(data.posts);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserInfo();
  }, [reactCtx.id, reactCtx.access]);

  return (
    <>
      <div>
        <div>
          <h1>My Dashboard</h1>
        </div>
        <h2>Contact me at {reactCtx.loginEmail}</h2>
        <br />
        {userData.length === 0 ? (
          <h2>You have not added any plants</h2>
        ) : (
          <div>
            <PlantCards data={userData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Userhome;
