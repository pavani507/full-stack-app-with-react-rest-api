import React, { Component } from "react";
import axios from "axios";

class UpdatedCourse extends Component {
  state = {
    courseId: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    createdBy: "",
    validationErrors: ""
  };

  componentDidMount() {
    this.handleGetCourse();
  }
  // Receive Updated Course data input by User

  handleInputChange = e => {
    const inputField = e.target;

    this.setState({
      [inputField.name]: inputField.value
    });
  };
  handleGetCourse = () => {
    axios
      .get("http://localhost:5000/api/courses/" + this.props.match.params.id)

      .then(res => {
        const course = res.data.course;

        if (course.userId !== parseInt(localStorage.getItem("id"))) {
          this.props.history.push("/forbidden");
        } else {
          this.setState({
            id: course.id,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: course.userId,
            validationErrors: ""
          });
        }
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
  //An "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route

  handleUpdateCourse = (e, user, password) => {
    e.preventDefault();

    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;

    if (title === "") {
      this.setState({
        validationErrors: "A title must be entered"
      });
    } else if (description === "") {
      this.setState({
        validationErrors: "A description must be entered"
      });
    } else if (title === "" && description === "") {
      this.setState({
        validationErrors: "A title and description must be entered"
      });
    } else {
      axios({
        method: "put",
        url: "http://localhost:5000/api/courses/" + this.props.match.params.id,
        auth: {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password")
        },
        data: {
          id,
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId
        }
      })
        .then(() => {
          this.setState({
            id: "",
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            userId: "",
            validationErrors: ""
          });

          // Show course details after updating

          this.props.history.push("/courses");
        })

        .catch(err => {
          if (err.response.status === 401) {
            const error = err.response.data.message;

            this.setState({
              validationErrors: error
            });
          } else if (err.response.status === 500) {
            this.props.history.push("/error");
          }
        });
    }
  };
  // this function returns the user to the "Course Detail" screen.
  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/courses/" + this.props.match.params.id);
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      validationErrors
    } = this.state;

    return (
      <div>
        <hr />
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            {validationErrors ? (
              <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                  <ul>
                    <li>{validationErrors}</li>
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}
            <form
              onSubmit={e =>
                this.handleUpdateCourse(
                  e,
                  localStorage.getItem("username"),
                  localStorage.getItem("password"),
                  title,
                  description,
                  materialsNeeded,
                  estimatedTime
                )
              }
            >
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title"
                      defaultValue={title}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <p>By {localStorage.getItem("name")}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description"
                      value={description}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          defaultValue={estimatedTime}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className=""
                          placeholder="Materials needed"
                          value={materialsNeeded}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Update Course
                </button>

                <button
                  className="button button-secondary"
                  to="#"
                  onClick={this.handleCancel.bind(this)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdatedCourse;
