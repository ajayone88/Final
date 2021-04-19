import React, { useState } from "react";
import Home from "./home/Home";
import Details from "./details/Details";
import Bookshow from "./bookshow/BookShow";
import Confirmation from "./confirmation/Confirmation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Controller = () => {
  const URI = "/api/v1/";
  const loginState = useState(false);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => (
            <Home {...props} baseUrl={URI} loginState={loginState} />
          )}
        ></Route>
        <Route
          exact
          path="/bookshow/:id"
          component={(props) => (
            <Bookshow {...props} baseUrl={URI} loginState={loginState} />
          )}
        ></Route>
        <Route
          exact
          path="/confirm/:id"
          component={(props) => (
            <Confirmation {...props} baseUrl={URI} loginState={loginState} />
          )}
        ></Route>
        <Route
          exact
          path="/details/:id"
          component={(props) => (
            <Details {...props} baseUrl={URI} loginState={loginState} />
          )}
        ></Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Controller;
