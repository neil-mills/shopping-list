import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from './queries';

export const withCurrentUser = (Component) => (props) => {
  const { client, data, loading, error } = useQuery(GET_CURRENT_USER, {partialRefetch: true});
  //const { client, data, loading, error } = useQuery(GET_CURRENT_USER);
  return <Component loading={loading} client={client} data={data} error={error} {...props} />;
};
