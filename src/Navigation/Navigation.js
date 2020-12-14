import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
import Messanger from "../components/Messanger/Messanger";

const Navigation = () => {
  const { tryLocalSignin, getUserDetails } = useContext(AuthContext);

  const getUser = async () => {
    const id = await tryLocalSignin();
    if (id) getUserDetails(id);
  };

  useEffect(() => {
    getUser();
  }, []);
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
          <Route path="/messages" component={Messanger} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Navigation;
