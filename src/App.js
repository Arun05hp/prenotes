import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation/Navigation";

import "./App.css";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/signup";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Navigation />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
