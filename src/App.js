import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Signup from "./components/Auth/Signup";
import "./App.css";

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
