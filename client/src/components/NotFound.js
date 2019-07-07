import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <hr />
      <div className="bounds">
        <h1>Not Found</h1>
        <p>
          Sorry! We couldn't find the page you're looking for. Click{" "}
          <Link to="/courses">here</Link> to go back to the Courses page.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
