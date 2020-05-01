import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
const PrivateRoute = ({
  component: Component,
  loggedIn = false,
  redirect = '/login',
  ...rest
}) => (
  <Route
    {...rest}
    render={(routeProps) =>
      loggedIn ? (
        <Component {...routeProps} />
      ) : (
        <Redirect
          to={{ pathname: redirect, state: { from: routeProps.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
