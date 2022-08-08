import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/user">Home</NavLink>
            </li>
            <li>
              <NavLink to="/user/add">Add Plant</NavLink>
            </li>
            <li>
              <NavLink to="/user/update">Profile</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
