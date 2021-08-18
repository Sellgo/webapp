import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import ScrollToTop from '../../components/ScrollToTop';
import Settings from '../Settings';
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
import Signup from '../Signup';
import ResetPassword from '../ResetPassword';
import Onboarding from '../Onboarding';
import SubscriptionPage from '../Subscription';
import Subscription from '../Settings/Subscription';
import Payment from '../Subscription/Payment';
import LeadsTracker from '../LeadsTracker';
import UserPilotReload from '../../components/UserPilotReload';
import ChurnFlow from '../ChurnFlow';

import SellerFinder from '../SellerFinder';
// import ProductResearch from '../ProductResearch';
import SellerResearch from '../SellerResearch';
import BetaUsersActivationForm from '../BetaUsersActivation';
import { isBetaAccount } from '../../utils/subscriptions';

export const auth = new Auth();

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

      // if beta user account then deny access to settings
      if (location.pathname.includes('/settings') && isBetaAccount(sellerSubscription)) {
        history.push('/activate-beta-account');
      }

      if (requireSubscription && localStorage.getItem('accountType') !== '') {
        // If user does not have a subscription and this route requires one
        // then redirect to pricing page.
        if (localStorage.getItem('accountType') === 'trial') {
          history.push('/settings/#amazon-mws');
        } else {
          localStorage.setItem('accountType', '');
          history.push('/synthesis');
        }
      } else {
        const subscriptionId = sellerSubscription.subscription_id;
        const isBetaLabel = sellerSubscription.is_beta;

        if (requireSubscription && subscriptionId === 5) {
          if (isBetaLabel) {
            history.push('/activate-beta-account');
          } else {
            history.push('/settings/pricing');
          }
        }
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
      return <PageLoader pageLoading={true} />;
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
            <AdminLayout>
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
    <div className="App__container">
      <Router history={history}>
        <ScrollToTop />
        <UserPilotReload />
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
              return <PageLoader pageLoading={true} />;
            }}
          />
          <Route
            exact={true}
            path="/signup"
            render={renderProps => <Signup auth={auth} {...renderProps} />}
          />
          <Route
            exact={true}
            path="/reset-password"
            render={renderProps => <ResetPassword auth={auth} {...renderProps} />}
          />
          <Route
            exact={true}
            path="/subscription"
            render={renderProps => <SubscriptionPage auth={auth} {...renderProps} />}
          />
          <Route
            exact={true}
            path="/subscription/payment"
            render={renderProps => <Payment auth={auth} {...renderProps} />}
          />
          <PrivateRoute exact={true} path="/settings" component={Settings} />
          <PrivateRoute
            exact={true}
            path="/onboarding"
            component={Onboarding}
            requireSubscription={true}
          />
          <PrivateRoute exact={true} path="/settings/pricing" component={Subscription} />
          <PrivateRoute
            exact={true}
            path="/synthesis"
            component={Synthesis}
            requireSubscription={true}
          />
          <PrivateRoute
            exact={true}
            path="/profit-finder/:supplierID"
            component={SupplierDetail}
            requireSubscription={true}
          />
          <PrivateRoute
            exact={true}
            path="/product-tracker"
            component={ProductTracker}
            requireSubscription={true}
          />
          <PrivateRoute
            exact={true}
            path="/leads-tracker"
            component={LeadsTracker}
            requireSubscription={true}
          />

          <PrivateRoute
            exact={true}
            path="/seller-research"
            component={SellerResearch}
            requireSubscription={true}
          />

          <PrivateRoute
            exact={true}
            path="/seller-finder"
            component={SellerFinder}
            requireSubscription={true}
          />

          {/* <PrivateRoute
            exact={true}
            path="/product-research"
            component={ProductResearch}
            requireSubscription={true}
          /> */}

          <PrivateRoute
            exact={true}
            path="/churnflow"
            component={ChurnFlow}
            requireSubscription={true}
          />

          <PrivateRoute
            exact={true}
            path="/activate-beta-account"
            component={BetaUsersActivationForm}
            requireSubscription={false}
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
