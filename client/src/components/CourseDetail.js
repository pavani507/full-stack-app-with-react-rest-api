import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import Header from "./Header";

class CourseDetail extends Component {
  state = {
    course: {},
    courseId: "",
    createdBy: "",
    publishedBy: "",
    validationErrors: ""
  };

  componentDidMount() {
    this.handleGetCourse();
  }
  // Retrieves the detail for a course from the REST API.
  handleGetCourse = () => {
    axios
      .get("http://localhost:5000/api/courses/" + this.props.match.params.id)

      .then(res => {
        const course = res.data.course;
        console.log(course);
        this.setState({
          course,
          courseId: course.id,
          createdBy: course.User.id
        });
      })
      .catch(err => {
        this.setState({
          validationErrors: err.message
        });
      });
  };
  // When clicked sends a DELETE request to the REST API to delete a course
  handleDeleteCourse = e => {
    e.preventDefault();

    axios
      .delete(
        "http://localhost:5000/api/courses/" + this.props.match.params.id,

        {
          auth: {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          },
          data: {
            id: this.state.courseId
          }
        }
      )
      .then(res => {
        this.props.history.push("/courses");
        console.log("Course successfully deleted");
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.props.history.push("/notfound");
        } else {
          console.log(err);
          this.props.history.push("/error");
        }
      });
  };
  render() {
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state.course;
    const { createdBy, validationErrors } = this.state;

    return (
      <div id="root">
        <div>
          <Header />
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {localStorage.getItem("id") !== "" &&
                  parseInt(localStorage.getItem("id")) === createdBy ? (
                    <span>
                      <Link
                        className="button"
                        to={"/courses/" + id + "/update"}
                      >
                        Update Course
                      </Link>

                      <Link
                        className="button"
                        to="#"
                        onClick={e =>
                          this.handleDeleteCourse(
                            e,
                            localStorage.getItem("username"),
                            localStorage.getItem("password")
                          )
                        }
                      >
                        Delete Course
                      </Link>
                    </span>
                  ) : (
                    ""
                  )}

                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>

                  {validationErrors ? (
                    <div>
                      <h2 className="validation--errors--label">
                        Validation errors
                      </h2>
                      <div className="validation-errors">
                        <ul>
                          <li>{validationErrors}</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <h3 className="course--title">{title}</h3>
                  <p>By {localStorage.getItem("name")}</p>
                </div>
                <div className="course--description">
                  <ReactMarkDown source={description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <ReactMarkDown source={materialsNeeded} />
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseDetail);
