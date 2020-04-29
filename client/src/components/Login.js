import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import { useForm, useLocalStorage } from '../hooks';
import { withLoginUser } from '../providers';
import LoginButton from './LoginButton';

const Login = ({ called, loading, data, error, loginUser }) => {
  const [token, setToken] = useLocalStorage('token');
  const { handleChange, handleSubmit, values } = useForm(loginUser, {
    email: '',
    password: '',
  });
  
  if (data) {
    if(token !== data.loginUser.token) setToken(data.loginUser.token);
    return <Redirect to="/" />;
  }
  const { email, password } = values;
  return (
    <Fragment>
      <LoginButton />
      <h2>Login</h2>
      {called && loading && <p>Loading</p>}
      {error && <p>Login failed</p>}
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              disabled={loading}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              disabled={loading}
            />
          </li>
          <li>
            <button type="submit" disabled={loading}>Login</button>
          </li>
        </ul>
      </form>
    </Fragment>
  );
};

export default withLoginUser(Login);
