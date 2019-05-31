import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { Home } from "../Home/Home";
import { ProductTracker } from "../ProductTracker/ProductTracker";
import { AdminLayout } from '../../components/AdminLayout/index';
import { Login } from '../Login/Login';
import { SignUp } from '../SignUp/Signup';
import { RecoverPass } from '../RecoverPass';
import { Setting } from '../Setting';

const App: React.SFC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/forgot-password" component={RecoverPass} />
      <Route exact path="/product-tracker" component={ProductTracker} />
      <Route exact path="/setting" component={Setting} />
      <Route render={() => <AdminLayout><Segment>Page not found</Segment></AdminLayout>} />
    </Switch>
  </Router>
);

export default App;
