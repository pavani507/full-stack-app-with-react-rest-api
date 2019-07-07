import React from "react";
import { Link } from "react-router-dom";

const UnHandleError = () => {
  return (
    <div>
      <hr />
      <div className="bounds">
        <h1>Unexpected Error</h1>
        <p>
          Sorry! An unexpected error has occurred Click{" "}
          <Link to="/courses">here</Link> to go back to the Courses page.
        </p>
      </div>
    </div>
  );
};

export default UnHandleError;
