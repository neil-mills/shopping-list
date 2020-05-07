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
        name
        categoryId {
          _id
          name
        }
        brandId {
          _id
          name
        }
        size
        unitId {
          _id
          name
        }
      }
      authorId
      retailerId {
        name
      }
      complete
    }
  }
`;

const GET_LIST = gql`
  query getList($id: ID) {
    list(id: $id) {
      _id
      date
      items {
        _id
        name,
        categoryId
        brandId,
        size,
        unitId
        prices {
          listId
          price
        }
      }
      retailerId {
        _id
        name
      }
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

const GET_BRANDS = gql`
  query getBrands($retailerId: ID) {
    brands(retailerId: $retailerId) {
      _id
      name
    }
  }
`;

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      name
    }
  }
`;

const GET_UNITS = gql`
  query getUnits {
    units {
      _id
      name
    }
  }
`;

const CREATE_ITEM = gql`
  mutation createItem($listId: ID, $item: ItemInput) {
    createItem(listId: $listId, item: $item) {
      _id
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem($listId: ID, $item: ItemInput) {
    updateItem(listId: $listId, item: $item) {
      _id
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($listId: ID, $id: ID) {
    deleteItem(listId: $listId, id: $id) {
      _id
    }
  }
`;

export {
  GET_CURRENT_USER,
  LOGIN_USER,
  CREATE_LIST,
  GET_LISTS,
  GET_LIST,
  GET_BRANDS,
  GET_CATEGORIES,
  GET_UNITS,
  IS_LOGGED_IN,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  GET_RETAILERS,
};
