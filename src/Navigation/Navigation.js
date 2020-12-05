import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home";
const Navigation = () => {
  return (
    <>
      <Navbar />
      <div className="app_container">
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default Navigation;
