import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Navigation from "./Navigation/Navigation";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="app_container">
          <Navigation />
        </div>
      </Router>
    </div>
  );
};

export default App;
