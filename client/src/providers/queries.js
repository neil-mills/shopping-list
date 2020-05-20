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
      message
      path
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
        name
        categoryId
        brandId
        size
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

const UPDATE_LIST = gql`
  mutation updateList($list: ListInput) {
    updateList(list: $list) {
      message
      path
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

const CREATE_RETAILER = gql`
  mutation createRetailer($retailer: RetailerInput) {
    createRetailer(retailer: $retailer) {
      message
      path
    }
  }
`;

const UPDATE_RETAILER = gql`
  mutation updateRetailer($retailer: RetailerInput) {
    updateRetailer(retailer: $retailer) {
      message
      path
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

const CREATE_BRAND = gql`
  mutation createBrand($brand: BrandInput) {
    createBrand(brand: $brand) {
      message
      path
    }
  }
`;

const UPDATE_BRAND = gql`
  mutation updateBrand($brand: BrandInput) {
    updateBrand(brand: $brand) {
      message
      path
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

const CREATE_CATEGORY = gql`
  mutation createCategory($category: CategoryInput) {
    createCategory(category: $category) {
      message
      path
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation updateCategory($category: CategoryInput) {
    updateCategory(category: $category) {
      message
      path
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

const CREATE_UNIT = gql`
  mutation createUnit($unit: UnitInput) {
    createUnit(unit: $unit) {
      message
      path
    }
  }
`;

const UPDATE_UNIT = gql`
  mutation updateUnit($unit: UnitInput) {
    updateUnit(unit: $unit) {
      message
      path
    }
  }
`;

const CREATE_ITEM = gql`
  mutation createItem($listId: ID, $item: ItemInput) {
    createItem(listId: $listId, item: $item) {
      message
      path
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem($listId: ID, $item: ItemInput) {
    updateItem(listId: $listId, item: $item) {
      message
      path
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($listId: ID, $_id: ID) {
    deleteItem(listId: $listId, _id: $_id) {
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
  UPDATE_LIST,
  GET_BRANDS,
  CREATE_BRAND,
  UPDATE_BRAND,
  GET_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  GET_UNITS,
  CREATE_UNIT,
  UPDATE_UNIT,
  IS_LOGGED_IN,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  GET_RETAILERS,
  CREATE_RETAILER,
  UPDATE_RETAILER,
};
