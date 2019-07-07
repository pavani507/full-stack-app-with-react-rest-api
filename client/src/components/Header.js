import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return JSON.parse(localStorage.getItem("IsLoggedIn")) ? (
    <div>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            <span>Welcome {localStorage.getItem("name")}!</span>
            <Link className="signup" to={"/signout"}>
              Sign out
            </Link>
          </nav>
        </div>
      </div>
      <hr />
    </div>
  ) : (
    <div>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            <NavLink className="signup" to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="signin" to="/signin">
              Sign In
            </NavLink>
          </nav>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
