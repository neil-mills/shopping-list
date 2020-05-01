import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from './queries';

export const withIsLoggedIn = (Component) => (props) => {
  const { client, loading, error, data: { isLoggedIn } = {} } = useQuery(
    IS_LOGGED_IN
  );
  return (
    <Component
      isLoggedIn={isLoggedIn}
      client={client}
      loading={loading}
      error={error}
      {...props}
    />
  );
};
