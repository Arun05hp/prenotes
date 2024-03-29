import React from "react";
import { Route, Redirect } from "react-router-dom";
import SecureStorage from "../helper/SecureStorage";
const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const data = SecureStorage.getItem("userData");
  console.log("data", data);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!data)
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { login: true },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
