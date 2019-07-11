import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

import "../global.css";

class Courses extends Component {
  state = {
    courses: []
  };
  componentDidMount() {
    this.getCourses();
  }
  //Retrieves the list of courses from the REST API
  getCourses = () => {
    fetch("http://localhost:5000/api/courses")
      .then(response => response.json())
      .then(res => {
        const courses = res.courses;
        this.setState({ courses });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.props.history.push("/notfound");
        } else {
          this.props.history.push("/error");
        }
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="bounds">
          {this.state.courses.map((course, index) => (
            <div className="grid-33" key={index}>
              <Link
                className="course--module course--link"
                to={"/courses/" + course.id}
              >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          ))}

          <div className="grid-33">
            <Link
              className="course--module course--add--module"
              to="/courses/create"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
