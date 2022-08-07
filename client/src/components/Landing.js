import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <button onClick={handleLoginClick}>Get started</button>
      <header>
        <div>
          <div>Bloom</div>
          <p>Introducing Bloom:</p>
        </div>
      </header>
    </>
  );
};

export default Landing;
