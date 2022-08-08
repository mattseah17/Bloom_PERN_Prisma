import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";
import NavBar from "../components/NavBar";

const SharedLayout = () => {
  const user = useAuthState().user;
  useEffect(() => {}, [user]);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
