import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { LOGIN_USER } from './queries';

export const withLoginUser = (Component) => (props) => {
  const [resolver, { called, loading, data, error }] = useLazyQuery(LOGIN_USER);
  const loginUser = (args) => resolver({ variables: { ...args } });

  return (
    <Component
      called={called}
      loading={loading}
      data={data}
      error={error}
      loginUser={loginUser}
      {...props}
    />
  );
};
