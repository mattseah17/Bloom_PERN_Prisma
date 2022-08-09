import React, { useContext } from "react";
import ReactContext from "../context/reactcontext";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const reactCtx = useContext(ReactContext);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    reactCtx.setLoginState(false);
    reactCtx.setAccess("");
    navigate("/");
  };

  return (
    <>
      <header>
        <nav>
          {reactCtx.loginState ? (
            <>
              <ul>
                <li>
                  <NavLink to="/home">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/update">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/add">Add Plant</NavLink>
                </li>
                <div>
                  <button onClick={handleLogoutClick}>Log Out</button>
                </div>
              </ul>
            </>
          ) : (
            <>
              <div>
                <button onClick={handleLoginClick}>Login</button>
              </div>
              <div>
                <button onClick={handleRegisterClick}>Register</button>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default NavBar;
