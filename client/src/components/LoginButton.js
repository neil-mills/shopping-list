import React from 'react'
import { Link } from 'react-router-dom';
import { withCurrentUser } from '../providers';

const LoginButton = ({client, data }) => {
  const logout = () => {
    window.localStorage.clear();
    client.resetStore();
  }
  if (data && data.currentUser) {
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

export default withCurrentUser(LoginButton);