import React, { useContext, useEffect } from "react";
import { message } from "antd";
import { Route, Switch } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
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
const Navigation = () => {
  const { tryLocalSignin, getUserDetails } = useContext(AuthContext);

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
          <Route path="/" exact component={Home} />
          <Route path="/myprofile" exact component={Profile} />
          <Route path="/myprofile/personalInfo" exact component={Profile} />
          <Route path="/myprofile/myuploads" exact component={Profile} />
          <Route path="/myprofile/changepassword" exact component={Profile} />
          <Route path="/notification" component={Notification} />
          <Route path="/messages" component={Messanger} />
          <Route path="/notes/search" component={NotesSearch} />

          <Route path="/notes/upload" component={NotesUpload} />
          <Route path="/tuitions/create" component={Reg} />
          <Route path="/tuitions/search" component={View} />
          <Route path="/exampapers/search" component={ExamSearch} />
          <Route path="/exampapers/upload" component={ExamUpload} />
          <Route path="/books/buy" component={BuyBook} />
          <Route path="/books/sell" component={SellBook} />
          <Route path="/messages" component={Messanger} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Navigation;
