import React, { useEffect, useState } from "react";
import { useAuthState, useUpdateAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PlantCards from "./Results";

const Userhome = () => {
  const { token, id } = useAuthState().user;

  const initUserInfo = {
    email: "",
  };
  const [userInfo, setUserInfo] = useState(initUserInfo);

  useEffect(() => {
    async function getUserInfo() {
      const url = "http://localhost:5002/user/" + id;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        setUserInfo({ email: data.email });
      } catch (err) {
        // console.log(err.message);
      }
    }
    getUserInfo();
  }, [id]);

  const logout = useUpdateAuthContext().logoutUser;
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div>
          <h1>My Dashboard</h1>
        </div>
        <h2>Contact me at {userInfo.email}</h2>
        <button
          onClick={() => {
            logout();
            navigate("/landing");
          }}
        >
          Log Out
        </button>
        {userInfo.posts.length === 0 ? (
          <h2>You have not added any plants</h2>
        ) : (
          <div>
            <PlantCards data={userInfo.posts} />
          </div>
        )}
      </div>
    </>
  );
};

export default Userhome;
