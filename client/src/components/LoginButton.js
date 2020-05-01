import React from 'react'
import { Link } from 'react-router-dom';
import { withIsLoggedIn } from '../providers';

const LoginButton = ({ client, isLoggedIn }) => {
  const logout = () => {
    window.localStorage.clear();
    client.writeData({ data: { isLoggedIn: false } });
    client.resetStore();
  }
  if (isLoggedIn) {
    return (
      <button onClick={logout}>Logout</button>
    )
  }
  return (
    <Link to='/login'>
      <button>Login</button>
    </Link>
  )
}

export default withIsLoggedIn(LoginButton);