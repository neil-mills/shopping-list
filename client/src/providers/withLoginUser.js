import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { LOGIN_USER } from './queries';

export const withLoginUser = (Component) => (props) => {
  const [resolver, { client, called, loading, data, error }] = useLazyQuery(LOGIN_USER);
  const loginUser = (args) => resolver({ variables: { ...args }, fetchPolicy: 'network-only' });

  return (
    <Component
      called={called}
      client={client}
      loading={loading}
      data={data}
      error={error}
      loginUser={loginUser}
      {...props}
    />
  );
};
