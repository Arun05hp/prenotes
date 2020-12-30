import React, { useContext, useEffect } from "react";
import { message } from "antd";
import { Route, Switch } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/protectedRoute";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
import Messanger from "../components/Messanger/Messanger";
import ExamSearch from "../components/Exam/Search/ExamSearch.jsx";
import ExamUpload from "../components/Exam/Upload/ExamUpload.jsx";
import NotesSearch from "../components/Notes/Search/NotesSearch.jsx";
import NotesUpload from "../components/Notes/Upload/NotesUpload.jsx";
import BuyBook from "../components/Books/Buy/BuyBook";
import SellBook from "../components/Books/Sell/SellBook";
import Notification from "../components/Notification/Notification";
import Reg from "../components/Tuition/Reg/Reg";
import View from "../components/Tuition/Find/View";
import NotFound from "../components/Errors/NotFound";
const Navigation = () => {
  const { tryLocalSignin, getUserDetails, state } = useContext(AuthContext);

  const getUser = async () => {
    const id = await tryLocalSignin();
    if (id) getUserDetails(id);
  };

  useEffect(() => {
    getUser();
    message.config({
      duration: 2,
      maxCount: 1,
    });
  }, []);
  return (
    <div className="main-container">
      <Navbar />
      <div className="app_container">
        <Switch>
          <Route exact path="/" exact component={Home} />
          <ProtectedRoute exact path="/myprofile" exact component={Profile} />
          <ProtectedRoute
            exact
            path="/myprofile/personalInfo"
            exact
            component={Profile}
          />
          <ProtectedRoute
            exact
            path="/myprofile/myuploads"
            exact
            component={Profile}
          />
          <ProtectedRoute
            exact
            path="/myprofile/changepassword"
            exact
            component={Profile}
          />
          <ProtectedRoute exact path="/myprofile/tutor" component={Profile} />
          <ProtectedRoute exact path="/notification" component={Notification} />
          <ProtectedRoute exact path="/messages" component={Messanger} />
          <Route exact path="/notes/search" component={NotesSearch} />

          <ProtectedRoute exact path="/notes/upload" component={NotesUpload} />
          <ProtectedRoute exact path="/tuitions/create" component={Reg} />
          <ProtectedRoute exact path="/tuitions/search" component={View} />
          <ProtectedRoute
            exact
            path="/exampapers/search"
            component={ExamSearch}
          />
          <ProtectedRoute
            exact
            path="/exampapers/upload"
            component={ExamUpload}
          />
          <ProtectedRoute exact path="/books/buy" component={BuyBook} />
          <ProtectedRoute exact path="/books/sell" component={SellBook} />
          <ProtectedRoute exact path="/messages" component={Messanger} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Navigation;
