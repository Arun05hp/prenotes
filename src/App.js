import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation/Navigation";

import "./App.css";

import Signup from "./components/Auth/Signup";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Navigation />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
