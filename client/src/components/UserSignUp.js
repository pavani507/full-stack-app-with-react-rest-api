import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    validationErrors: ""
  };

  handleInputChange = e => {
    const inputField = e.target;

    this.setState({
      [inputField.name]: inputField.value
    });
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/courses");
  };

  handleSignUp(e) {
    e.preventDefault();

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    if (password === "") {
      this.setState({
        validationErrors: "You must enter a password."
      });
    } else if (password !== confirmPassword) {
      this.setState({
        validationErrors: "Passwords do not match."
      });
    } else {
      var url = "http://localhost:5000/api/users";
      var data = { firstName, lastName, emailAddress, password };

      axios({
        method: "POST",
        url: url,
        data: data
      })
        .then(res => {
          console.log(firstName);
          if (res.status === 201) {
            console.log(`User ${firstName} ${lastName} successfully created`);

            this.setState({
              validationErrors: ""
            });

            this.props.signin(null, emailAddress, password);
          }
        })
        .catch(err => {
          console.log(err.response.status);
          if (err.response.status === 400) {
            const error = err.response.data.message;

            this.setState({
              validationErrors: error
            });
          } else if (err.response.status === 500) {
            this.props.history.push("/error");
          }
        });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      validationErrors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
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
                this.handleSignUp(
                  e,
                  firstName,
                  lastName,
                  emailAddress,
                  password
                )
              }
            >
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>

                <button
                  className="button button-secondary"
                  to="#"
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account?
            <Link to="/signin">Click here</Link>
            to sign in!
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserSignUp);
