import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useState } from "react";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const [loggedIn, setLoggedIn] = useState(
    !(localStorage.getItem("jwt") == null) ? true : false
  );

  return (
    <Route>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;
