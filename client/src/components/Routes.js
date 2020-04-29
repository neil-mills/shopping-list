import React from 'react'
import { Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';

export const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </>
  )
}

export default Routes;
