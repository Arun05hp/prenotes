import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";

const Navigation = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="app_container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/myprofile" exact component={Profile} />
          <Route path="/myprofile/personalInfo" exact component={Profile} />
          <Route path="/myprofile/myuploads" exact component={Profile} />
          <Route path="/myprofile/changepassword" exact component={Profile} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Navigation;
