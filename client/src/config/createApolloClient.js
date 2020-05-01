import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  typeDefs,
  resolvers,
  uri: process.env.REACT_APP_APOLLO_URL || 'http://localhost:3000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

export default client;
