import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_RETAILERS } from './queries';

export const withRetailers = Component => props => {
  const { data, loading, error } = useQuery(GET_RETAILERS);
  return (<Component data={data} loading={loading} error={error} {...props} />);
}

