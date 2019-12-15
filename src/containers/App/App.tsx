import React, { useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import Settings from '../Settings';
import Subscription from '../Settings/Subscription';
import Home from '../Home';
import Synthesis from '../Synthesis';
import SupplierDetail from '../Synthesis/Supplier';
import Auth from '../../components/Auth/Auth';
import PageLoader from '../../components/PageLoader';
import NotFound from '../../components/NotFound';
import history from '../../history';
import FullStory from 'react-fullstory';
import { connect } from 'react-redux';
import { fetchSellerSubscription } from '../../actions/Settings/Subscription';

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

// TODO: Extract to separate file once we can import auth instance
// in any component rather than create above.
const PrivateRoute = connect(
  // mapStateToProps
  (state: any) => ({
    sellerSubscription: state.subscription.sellerSubscription,
  }),
  //mapDispatchToProps
  {
    fetchSellerSubscription: () => fetchSellerSubscription(),
  }
)(
  ({
    component: Component,
    requireSubscription,
    sellerSubscription,
    fetchSellerSubscription,
    location,
    ...rest
  }: any) => {
    // This hook will run if sellerSubscription changes (fetch completes) or ...
    // if React Router location changes (so we redirect if requireSubscription is true)
    // TODO: Hoist this logic up to an AuthProvider that includes user's subscription as part
    // of auth object made available to all child components using context.
    useEffect(() => {
      // Fetch seller's subscription if not cached in Redux yet
      if (sellerSubscription === undefined) {
        fetchSellerSubscription();
        // If we now know the user's subscription status then redirect to pricing
        // only if this route requires a subscription and the seller doesn't have one.
      } else if (requireSubscription && sellerSubscription === false) {
        history.push('/settings/pricing');
      }
    }, [sellerSubscription, location]);

    return (
      <Route
        {...rest}
        render={(props: any) => {
          if (isAuthenticated()) {
            if (sellerSubscription !== undefined) {
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
              return <PageLoader />;
            }
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    );
  }
);

function App(props: any) {
  return (
    <div>
      <FullStory org="Q36Y3" />
      <Router history={history}>
        <Switch>
          <Route
            exact={true}
            path="/"
            render={renderProps => <Home auth={auth} {...renderProps} />}
          />
          <Route
            path="/callback"
            render={renderProps => {
              handleAuthentication(renderProps.location);
              return <PageLoader />;
            }}
          />

          <PrivateRoute exact={true} path="/settings" component={Settings} />
          <PrivateRoute exact={true} path="/settings/pricing" component={Subscription} />
          <PrivateRoute
            exact={true}
            path="/synthesis"
            component={Synthesis}
            requireSubscription={true}
          />
          <PrivateRoute
            exact={true}
            path="/synthesis/:supplierID"
            component={SupplierDetail}
            requireSubscription={true}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
