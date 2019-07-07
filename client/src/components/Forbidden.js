import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div>
      <hr />
      <div className="bounds">
        <h1>Forbidden Access</h1>
        <p>
          Sorry! Access to this page by your account is forbidden. Click{" "}
          <Link to="/courses">here</Link> to go back to the Courses page.
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
