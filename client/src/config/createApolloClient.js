import ApolloClient from 'apollo-boost';


const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URL || 'http://localhost:3000/graphql',
  request: async operation => { //called on every request...
    const token = window.localStorage.getItem('token');  //checks if token has been set in local storage
    if (token) {
      operation.setContext({ //if so, forwards it in the bearer authorization header
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      })
      
    }
  }
});

export default client;