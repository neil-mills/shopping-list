import React from 'react'
import { Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from '../containers/Profile';
import List from '../containers/List';
import PrivateRoute from './PrivateRoute';
import { withIsLoggedIn } from '../providers';
export const Routes = ({ isLoggedIn }) => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute  redirect="/login" loggedIn={isLoggedIn} exact path="/profile" component={Profile} />
      <PrivateRoute redirect="/login" loggedIn={isLoggedIn} exact path="/list/:id" component={List} />
    </>
  )
}

export default withIsLoggedIn(Routes);
