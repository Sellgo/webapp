import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
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

const auth = new Auth();

const handleAuthentication = (location: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
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
            if (localStorage.getItem('isLoggedIn')) {
              return (
                <AdminLayout auth={auth} {...Props} title={'Setting'}>
                  <Setting/>
                </AdminLayout>
              );
            } else {
              history.push('/');
            }
          }}
        />
        <Route
          exact={true}
          path="/dashboard"
          render={Props => {
            if (localStorage.getItem('isLoggedIn')) {
              return (
                <AdminLayout auth={auth} {...Props} title={'Dashboard'}>
                  <Dashboard/>
                </AdminLayout>
              );
            } else {
              history.push('/');
            }
          }}
        />

        <Route
          exact={true}
          path="/syn"
          render={() => {
            if (localStorage.getItem('isLoggedIn')) {
              return (
                <AdminLayout auth={auth} {...Props} title={'SYN'}>
                  <Suppliers/>
                </AdminLayout>
              );
            } else {
              history.push('/');
            }
          }}
        />
        <Route
          exact={true}
          path="/syn/:supplierID"
          render={routeProps => {
            if (localStorage.getItem('isLoggedIn')) {
              return (
                <AdminLayout auth={auth} {...Props} title={'Dashboard'}>
                  <SupplierDetail {...routeProps} />
                </AdminLayout>
              );
            } else {
              history.push('/');
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
