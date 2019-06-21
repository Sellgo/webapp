import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { AdminLayout } from '../../components/AdminLayout/index';
import { Dashboard } from '../Dashboard';
import Setting from '../Dashboard/Setting';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { ProductTracker } from '../ProductTracker/ProductTracker';
import { RecoverPass } from '../RecoverPass';
import { SignUp } from '../SignUp/Signup';

import Auth from '../../components/Auth/Auth';
import Callback from '../../components/Callback/Callback';
import history from '../../history';

const auth = new Auth();

const handleAuthentication = (location: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

function App(props: any) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" render={props => <Home auth={auth} {...props} />} />
        <Route exact={true} path="/login" render={() => <Login auth={auth} />} />
        <Route exact={true} path="/sign-up" render={() => <SignUp auth={auth} />} />
        <Route exact={true} path="/forgot-password" component={RecoverPass} />
        <Route exact={true} path="/product-tracker" component={ProductTracker} />
        <Route
          exact={true}
          path="/dashboard/setting"
          render={() => (
            <AdminLayout auth={auth} {...props} title={'Setting'}>
              <Setting />
            </AdminLayout>
          )}
        />
        <Route
          exact={true}
          path="/dashboard"
          render={props => (
            <AdminLayout auth={auth} {...props} title={'Dashboard'}>
              <Dashboard />
            </AdminLayout>
          )}
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props.location);
            return <Callback {...props} />;
          }}
        />
        <Route
          render={() => (
            <AdminLayout auth={auth} {...props}>
              <Segment>Page not found</Segment>
            </AdminLayout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
