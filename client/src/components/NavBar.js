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
        <nav className="bg-green-800 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <img src="" class="mr-3 h-6 sm:h-9" alt="Bloom Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Bloom
            </span>

            {reactCtx.loginState ? (
              <>
                <div
                  className="hidden w-full md:block md:w-auto"
                  id="navbar-default"
                >
                  <ul>
                    <li>
                      <NavLink to="/home" className="flex mb-2 hover:scale-105">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/update"
                        className="flex mb-2 hover:scale-105"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/add" className="flex mb-2 hover:scale-105">
                        Add Plant
                      </NavLink>
                    </li>
                    <div>
                      <button onClick={handleLogoutClick}>Log Out</button>
                    </div>
                  </ul>
                </div>
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
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
