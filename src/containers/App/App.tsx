import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { AdminLayout } from '../../components/AdminLayout/index';
import { Dashboard } from '../Dashboard';
import { Setting } from '../Dashboard/Setting';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { ProductTracker } from '../ProductTracker/ProductTracker';
import { RecoverPass } from '../RecoverPass';
import { SignUp } from '../SignUp/Signup';

const App: React.SFC = () => (
  <Router>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/sign-up" component={SignUp} />
      <Route exact={true} path="/forgot-password" component={RecoverPass} />
      <Route exact={true} path="/product-tracker" component={ProductTracker} />
      <Route
        exact={true}
        path="/dashboard/setting"
        render={() => (
          <AdminLayout title={'Setting'}>
            <Setting />
          </AdminLayout>
        )}
      />
      <Route exact={true} path="/dashboard" component={Dashboard} />
      <Route
        render={() => (
          <AdminLayout title={''}>
            <Segment>Page not found</Segment>
          </AdminLayout>
        )}
      />
    </Switch>
  </Router>
);

export default App;
