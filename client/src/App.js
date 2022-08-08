import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <>
      <header>
        <div>
          <div>
            <h1>Bloom</h1>
          </div>
          <div>
            <p>Blah blah</p>
          </div>
        </div>
        <div>
          <button onClick={handleLoginClick}>Login</button>
        </div>
        <div>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </header>
    </>
  );
}

export default App;
