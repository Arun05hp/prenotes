import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as NotesProvider } from "./context/NotesContext";
import { Provider as BooksProvider } from "./context/BooksContext";
import Navigation from "./Navigation/Navigation";
import Signup from "./components/Auth/Signup";
import "./App.css";

const App = () => {
  return (
    <BooksProvider>
      <NotesProvider>
        <AuthProvider>
          <div className="app">
            <Router>
              <Switch>
                <Route path="/signup" exact component={Signup} />
                <Navigation />
              </Switch>
            </Router>
          </div>
        </AuthProvider>
      </NotesProvider>
    </BooksProvider>
  );
};

export default App;
