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
        <nav class="fixed w-full z-20 bg-white flex border-gray-200 pt-5 pb-5 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
          <div className="container flex items-center mx-auto">
            <img
              src="https://cdn-icons.flaticon.com/png/512/3968/premium/3968242.png?token=exp=1660199396~hmac=1fee401bf92b74220d7dbd4e38497e48"
              class="mr-3 h-6 sm:h-9"
              alt="Bloom Logo"
            />
            <span className="text-yellow-800 font-body self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
              Bloom
            </span>

            {reactCtx.loginState ? (
              <>
                <div class="ml-20 flex justify-around">
                  <div className="inline ml-10 mr-10 font-body text-xl text-gray-700 hover:scale-110">
                    <NavLink to="/home">Home</NavLink>
                  </div>
                  <div className="inline ml-10 mr-10 font-body text-xl text-gray-700 hover:scale-110">
                    <NavLink to="/update">Profile</NavLink>
                  </div>
                  <div className="inline ml-10 mr-10 font-body text-xl text-gray-700 hover:scale-110">
                    <NavLink to="/add">Add Plant</NavLink>
                  </div>
                  <div>
                    <button
                      className="absolute font-body2 top-4 right-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-6 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 justify-end"
                      onClick={handleLogoutClick}
                    >
                      Log Out
                    </button>
                  </div>
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
