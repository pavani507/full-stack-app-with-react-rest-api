import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    validationErrors: ""
  };

  handleInputChange = e => {
    const inputField = e.target;

    this.setState({
      [inputField.name]: inputField.value
    });
  };

  render() {
    const { validationErrors } = this.props;
    return (
      <div id="root">
        <Header />
        <div>
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign In</h1>
              <div>
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
                <form
                  onSubmit={e =>
                    this.props.signIn(
                      e,
                      this.state.emailAddress,
                      this.state.password,
                      this.props
                    )
                  }
                >
                  <div>
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="text"
                      onChange={this.handleInputChange}
                      className=""
                      placeholder="Email Address"
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={this.handleInputChange}
                      className=""
                      placeholder="Password"
                    />
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">
                      Sign In
                    </button>

                    <Link className="button button-secondary" to="/">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>
                Don't have a user account?
                <Link to="/signup">Click here</Link>
                to sign up!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(UserSignIn);
