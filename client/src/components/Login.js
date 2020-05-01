import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { useForm, useLocalStorage } from '../hooks';
import { withLoginUser } from '../providers';

const Login = ({
  client,
  called,
  loading,
  data,
  error,
  loginUser,
  history,
}) => {
  const [token, setToken] = useLocalStorage('token');
  const { handleChange, handleSubmit, values } = useForm(loginUser, {
    email: '',
    password: '',
  });

  const redirect = async () => {
    await client.writeData({ data: { isLoggedIn: true } });
    setToken(data.loginUser.token);
    history.push('/profile');
  };

  if (!loading && data && token !== data.loginUser.token) {
    redirect();
  }

  const { email, password } = values;
  return (
    <Fragment>
      <h1>Login</h1>
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
            <button type="submit" disabled={loading}>
              Login
            </button>
          </li>
        </ul>
      </form>
    </Fragment>
  );
};

export default withLoginUser(withRouter(Login));
