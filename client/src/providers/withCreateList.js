import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIST, GET_LISTS } from './queries';

export const withCreateList = (Component) => (props) => {
  const [resolver, { loading, error }] = useMutation(CREATE_LIST);

  const createList = ({ list }) =>
    resolver({
      variables: { list },
      refetchQueries: [{ query: GET_LISTS }]
    });

  return (
    <Component
      createList={createList}
      loading={loading}
      error={error}
      {...props}
    />
  );
};
