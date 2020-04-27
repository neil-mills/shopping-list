import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_POSTS = gql`
  query {
    posts {
      _id
      title
      content
    }
  }
`;

export const withPosts = (Component) => (props) => {
  const { data, loading, error } = useQuery(GET_POSTS);
  return <Component loading={loading} data={data} error={error} {...props} />;
};
