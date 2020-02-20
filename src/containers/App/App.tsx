import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import ScrollToTop from '../../components/ScrollToTop';
import Settings from '../Settings';
import Subscription from '../Settings/Subscription';
import Home from '../Home';
import Synthesis from '../Synthesis';
import SupplierDetail from '../Synthesis/Supplier';
import Auth from '../../components/Auth/Auth';
import PageLoader from '../../components/PageLoader';
import NotFound from '../../components/NotFound';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchSellerSubscription } from '../../actions/Settings/Subscription';
import '../../analytics';
import ProductTracker from '../ProductTracker';

const auth = new Auth();

const handleAuthentication = (location: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const isAuthenticated = () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    if (auth.isAuthenticated()) {
      Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('idToken')}`;
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
  // mapDispatchToProps
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
    const userIsAuthenticated = isAuthenticated();

    // This effect will run if there is a change in sellerSubscription,
    // auth status, or route so that we can take the appropriate action.
    // TODO: Hoist this logic up to an AuthProvider that includes user's subscription as part
    // of auth object made available to all child components using context.
    useEffect(() => {
      // Redirect to login if user is not authenticated
      if (!userIsAuthenticated) {
        history.push('/');
        return;
      }

      // Fetch seller's subscription if not cached in Redux yet
      // When subscription status comes in this effect will be recalled
      // and take action depending on status.
      if (sellerSubscription === undefined) {
        fetchSellerSubscription();
        return;
      }

      // If user does not have a subscription and this route requires one
      // then redirect to pricing page.
      if (requireSubscription && sellerSubscription === false) {
        history.push('/settings/pricing');
      }
    }, [
      userIsAuthenticated,
      sellerSubscription,
      fetchSellerSubscription,
      requireSubscription,
      location,
    ]);

    // Render nothing. Redirect will be handled in above effect.
    if (!userIsAuthenticated) {
      return null;
    }

    // Render loader. Fetching of subscription will be handled in above effect.
    if (sellerSubscription === undefined) {
      return <PageLoader />;
    }

    return (
      <Route
        {...rest}
        render={(props: any) => {
          // TODO: Rather than pass auth by mutating props either
          // 1) export instance from Auth.tsx so we can import it anywhere
          // 2) or make available via redux or context provider
          props.match.params.auth = auth;

          return (
            <AdminLayout auth={auth}>
              <Component {...props} />
            </AdminLayout>
          );
        }}
      />
    );
  }
);

function App() {
  return (
    <div>
      <Router history={history}>
      <ScrollToTop />
        <Switch>
          <Route
            exact={true}
            path="/"
            render={renderProps => <Home auth={auth} {...renderProps} />}
          />
          <Route
            exact={true}
            path="/signup"
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
          <PrivateRoute
            exact={true}
            path="/product-tracker"
            component={ProductTracker}
            requireSubscription={true}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
