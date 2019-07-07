const UserSignOut = () => {
  localStorage.clear();
  window.location.href = "/signin";
  return null;
};

export default UserSignOut;

/** import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class UserSignOut extends Component {
  logOut = () => {
    window.localStorage.removeItem("FirstName");
    window.localStorage.removeItem("LastName");
    window.localStorage.removeItem("Email");
    window.localStorage.removeItem("Password");
    window.localStorage.removeItem("UserId");
    window.localStorage.removeItem("IsLoggedIn");
    window.location.assign("/signin");
  };
  componentDidMount() {
    this.logOut();
  }

  render() {
    return <Redirect to="/signin" />;
  }
}

export default UserSignOut; **/
