import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import axios from "axios";

import CreateCourse from "./components/CreateCourse";
import Courses from "./components/Courses";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CourseDetail from "./components/CourseDetail";
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";

import Forbidden from "./components/Forbidden";
import UnHandleError from "./components/UnHandleError";
import NotFound from "./components/NotFound";

class App extends Component {
  state = {
    validationErrors: ""
  };
  handleSignIn = (e, email, password, props) => {
    if (e) {
      e.preventDefault();
    }

    axios
      .get(
        "http://localhost:5000/api/users",

        {
          auth: {
            username: email,
            password: password
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          const user = res.data;

          console.log("user data: ", user);

          const name = user.firstName + " " + user.lastName;

          window.localStorage.setItem("id", user.id);
          window.localStorage.setItem("username", email);
          window.localStorage.setItem("password", password);
          window.localStorage.setItem("name", name);
          localStorage.setItem("IsLoggedIn", JSON.stringify(true));

          this.setState({
            validationErrors: ""
          });

          const path = "/";
          console.log("props in signin: ", props);
          props.history.push(path);
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          const error = err.response.data.message;
          this.setState({
            validationErrors: error
          });
        } else if (err.response.status === 500) {
          props.history.push("/error");
        }
      });
  };
  render() {
    return (
      <Router>
        <div className="App">
          {/*  <Header />*/}
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/courses" />} />
            <Route
              path="/signin"
              render={() => (
                <UserSignIn
                  signIn={this.handleSignIn}
                  validationErrors={this.state.validationErrors}
                />
              )}
            />
            <Route exact path="/signout" render={() => <UserSignOut />} />

            <Route
              path="/signup"
              render={() => (
                <UserSignUp
                  signIn={this.handleSignIn}
                  validationErrors={this.state.validationErrors}
                />
              )}
            />
            <Route exact path="/courses" render={() => <Courses />} />
            <PrivateRoute path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <PrivateRoute
              exact
              path="/courses/:id/update"
              component={UpdateCourse}
            />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/error" component={UnHandleError} />
            <Route path="/notfound" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
