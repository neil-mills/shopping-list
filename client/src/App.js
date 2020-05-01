import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './config/createApolloClient';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div>
          <Router>
            <Header />
            <Switch>
              <Routes />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
