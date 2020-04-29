import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './config/createApolloClient';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
