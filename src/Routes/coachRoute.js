import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../Services/authService";

const CoachRoute = ({ component: Component, render, ...rest }) => {
  const currentUser = auth.getCurrentUser();
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && currentUser.role === "coach") {
          return Component ? <Component {...props} /> : render(props);
        }
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default CoachRoute;
