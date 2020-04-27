import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_POSTS } from './withPosts';

const ADD_POST = gql`
  mutation($post: PostInput) {
    addPost(post: $post) {
      _id
      title
      content
    }
  }
`;

export const withAddPost = (Component) => (props) => {
  const [mutationFn] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const addPost = ({ title, content }) =>
    mutationFn({
      variables: { post: { title, content } },
    });

  return <Component addPost={addPost} {...props} />;
};
