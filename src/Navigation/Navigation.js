import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import Signup from "../components/Auth/signup";
import Profile from "../components/Profile/Profile";
import ChangePassword from "../components/Auth/ChangePassword";
import MyUpload from "../components/MyUpload/MyUpload";
const Navigation = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="app_container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/myprofile" exact component={Profile} />
          <Route path="/changepassword" exact component={ChangePassword} />
          <Route path="/myuploads" exact component={MyUpload} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Navigation;
