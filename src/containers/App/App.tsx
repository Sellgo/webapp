import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import Settings from '../Settings';
import Subscription from '../Settings/Subscription';
import Home from '../Home';
import Synthesis from '../Synthesis';
import SupplierDetail from '../Synthesis/Supplier';
import Auth from '../../components/Auth/Auth';
import Callback from '../../components/Callback';
import NotFound from '../../components/NotFound';
import history from '../../history';
import { ToastContainer } from 'react-toastify';
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
      Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('idToken')}`;
      return true;
    } else {
      auth.logout();
      return false;
    }
  } else {
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated()) {
          // TODO: Rather than pass auth by mutating props either
          // 1) export instance from Auth.tsx so we can import it anywhere
          // 2) or make available via redux or context provider
          props.match.params.auth = auth;

          return (
            <AdminLayout auth={auth}>
              <Component {...props} />
            </AdminLayout>
          );
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

function App(props: any) {
  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar={true} bodyClassName="toast-body" />
      <Router history={history}>
        <Switch>
          <Route
            exact={true}
            path="/"
            render={renderProps => <Home auth={auth} {...renderProps} />}
          />
          {/* <Route exact={true} path="/login" render={() => <Login auth={auth} />} />
          <Route exact={true} path="/sign-up" render={() => <SignUp auth={auth} />} />
          <Route exact={true} path="/forgot-password" component={RecoverPass} /> */}
          <Route
            path="/callback"
            render={renderProps => {
              handleAuthentication(renderProps.location);
              return <Callback {...renderProps} />;
            }}
          />

          <PrivateRoute exact={true} path="/settings" component={Settings} />
          <PrivateRoute exact={true} path="/settings/pricing" component={Subscription} />
          {/* <PrivateRoute exact={true} path="/dashboard" component={Dashboard} /> */}
          <PrivateRoute exact={true} path="/synthesis" component={Synthesis} />
          <PrivateRoute exact={true} path="/synthesis/:supplierID" component={SupplierDetail} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
