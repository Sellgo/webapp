import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

import { Home } from "./Home";
import { ProductTracker } from "./ProductTracker";
import { Layout } from './Layout';
import { Login } from './Login';

const App: React.SFC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/product-tracker" component={ProductTracker} />
      <Route render={() => <Layout><Segment>Page not found</Segment></Layout>} />
    </Switch>
  </Router>
);

export default App;
