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
        <nav class="bg-white flex border-gray-200 pt-5 pb-5 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
          <div className="container flex flex-wrap items-center mx-auto">
            <img
              src="https://cdn-icons.flaticon.com/png/512/3968/premium/3968242.png?token=exp=1660199396~hmac=1fee401bf92b74220d7dbd4e38497e48"
              class="mr-3 h-6 sm:h-9"
              alt="Bloom Logo"
            />
            <span className="text-yellow-800 font-body self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
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
                      <NavLink
                        to="/home"
                        className="flex font-body text-white mb-2 hover:scale-105"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/update"
                        className="flex font-body text-white mb-2 hover:scale-105"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/add"
                        className="flex font-body text-white mb-2 hover:scale-105"
                      >
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
                  <button
                    className="absolute font-body2 top-4 right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 justify-end"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </div>
                <div>
                  <button
                    className="absolute font-body2 top-4 right-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-6 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 justify-end"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
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
