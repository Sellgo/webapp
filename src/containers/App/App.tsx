import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout/index';
import Dashboard from '../Dashboard';
import Settings from '../Settings';
import Subscription from '../Settings/Subscription';
import Home from '../Home';
import Login from '../Login';
import ProductTracker from '../ProductTracker';
import RecoverPass from '../RecoverPass';
import SignUp from '../SignUp';
import Synthesis from '../Synthesis';
import SupplierDetail from '../Synthesis/Supplier';
import Auth from '../../components/Auth/Auth';
import Callback from '../../components/Callback';
import history from '../../history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = new Auth();

const handleAuthentication = (location: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const isAuthenticated = () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    if (auth.isAuthenticated()) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('idToken')}`;
      return true;
    } else {
      auth.logout();
      return false;
    }
  } else {
    return false;
  }
};

function App(Props: any) {
  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar={true} bodyClassName="toast-body" />
      <Router history={history}>
        <Switch>
          <Route exact={true} path="/" render={Props => <Home auth={auth} {...Props} />} />
          <Route exact={true} path="/login" render={() => <Login auth={auth} />} />
          <Route exact={true} path="/sign-up" render={() => <SignUp auth={auth} />} />
          <Route exact={true} path="/forgot-password" component={RecoverPass} />
          <Route exact={true} path="/product-tracker" component={ProductTracker} />
          <Route
            path="/callback"
            render={Props => {
              handleAuthentication(Props.location);
              return <Callback {...Props} />;
            }}
          />
          <Route
            exact={true}
            path="/settings"
            render={routeProps => {
              routeProps.match.params.auth = auth;
              if (isAuthenticated()) {
                return <Settings {...routeProps} />;
              }
            }}
          />
          <Route
            exact={true}
            path="/settings/subscription"
            render={routeProps => {
              routeProps.match.params.auth = auth;
              if (isAuthenticated()) {
                return <Subscription {...routeProps} />;
              }
            }}
          />
          <Route
            exact={true}
            path="/dashboard"
            render={routeProps => {
              routeProps.match.params.auth = auth;
              if (isAuthenticated()) {
                return <Dashboard {...routeProps} />;
              }
            }}
          />

          <Route
            exact={true}
            path="/synthesis"
            render={routeProps => {
              routeProps.match.params.auth = auth;
              if (isAuthenticated()) {
                return <Synthesis {...routeProps} />;
              }
            }}
          />
          <Route
            exact={true}
            path="/synthesis/:supplierID"
            render={routeProps => {
              routeProps.match.params.auth = auth;
              if (isAuthenticated()) {
                return <SupplierDetail {...routeProps} />;
              }
            }}
          />
          <Route
            render={() => (
              <AdminLayout auth={auth} {...Props}>
                <Segment>Page not found</Segment>
              </AdminLayout>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
