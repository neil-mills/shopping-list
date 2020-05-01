import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      firstName
      lastName
    }
  }
`;

const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client #gets value from local cache
  }
`;

const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

const CREATE_LIST = gql`
  mutation createList($list: ListInput!) {
    createList(list: $list) {
      _id
      date
      retailerId
    }
  }
`;

const GET_LISTS = gql`
  query getLists($filters: ListFilterInput) {
    lists(filters: $filters) {
      _id
      date
      items {
         _id
        itemId
        sizeId
      }
      authorId
      retailerId
      complete
    }
  }
`;

const GET_RETAILERS = gql`
  query getRetailers {
    retailers {
      _id
      name
    }
  }
`;

export {
  GET_CURRENT_USER,
  LOGIN_USER,
  CREATE_LIST,
  GET_LISTS,
  IS_LOGGED_IN,
  GET_RETAILERS,
};
