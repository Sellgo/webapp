import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { AdminLayout } from '../../components/AdminLayout/index';
import { Dashboard } from '../Dashboard';
import Setting from '../Dashboard/Setting';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { ProductTracker } from '../ProductTracker/ProductTracker';
import RecoverPass from '../RecoverPass';
import { SignUp } from '../SignUp/Signup';
import Suppliers from '../SYN/suppliers';
import SupplierDetail from '../SYN/suppliers/supplierDetail';
import Auth from '../../components/Auth/Auth';
import Callback from '../../components/Callback/Callback';
import history from '../../history';
import axios from 'axios';
import { URLS } from '../../config';
import { setTimeEfficiency } from '../../Action/SYNActions';

const auth = new Auth();

const handleAuthentication = (location: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const isAuthenticated = () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    // const sellerID = localStorage.getItem('userId');
    // const idToken = localStorage.getItem('idToken');
    if (auth.isAuthenticated()) {
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
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" render={Props => <Home auth={auth} {...Props} />}/>
        <Route exact={true} path="/login" render={() => <Login auth={auth}/>}/>
        <Route exact={true} path="/sign-up" render={() => <SignUp auth={auth}/>}/>
        <Route exact={true} path="/forgot-password" component={RecoverPass}/>
        <Route exact={true} path="/product-tracker" component={ProductTracker}/>
        <Route
          path="/callback"
          render={Props => {
            handleAuthentication(Props.location);
            return <Callback {...Props} />;
          }}
        />
        <Route
          exact={true}
          path="/dashboard/setting"
          render={() => {
            if (isAuthenticated()) {
              return (
                <AdminLayout auth={auth} {...Props} title={'Setting'}>
                  <Setting/>
                </AdminLayout>
              );
            } else {
              return <Redirect to={{ pathname: '/', state: { from: Props.location } }}/>;
            }
          }}
        />
        <Route
          exact={true}
          path="/dashboard"
          render={Props => {
            if (isAuthenticated()) {
              return (
                <AdminLayout auth={auth} {...Props} title={'Dashboard'}>
                  <Dashboard/>
                </AdminLayout>
              );
            } else {
              return <Redirect to={{ pathname: '/', state: { from: Props.location } }}/>;
            }
          }}
        />

        <Route
          exact={true}
          path="/syn"
          render={() => {
            if (isAuthenticated()) {
              return (
                <AdminLayout auth={auth} {...Props} title={'SYN'}>
                  <Suppliers/>
                </AdminLayout>
              );
            } else {
              return <Redirect to={{ pathname: '/', state: { from: Props.location } }}/>;
            }
          }}
        />
        <Route
          exact={true}
          path="/syn/:supplierID"
          render={routeProps => {
            if (isAuthenticated()) {
              return (
                <AdminLayout auth={auth} {...Props} title={'Dashboard'}>
                  <SupplierDetail {...routeProps} />
                </AdminLayout>
              );
            } else {
              return <Redirect to={{ pathname: '/', state: { from: Props.location } }}/>;
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
  );
}

export default App;
