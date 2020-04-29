import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  {
    currentUser {
      firstName
      lastName
    }
  }
`;

const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

export {
  GET_CURRENT_USER,
  LOGIN_USER
}