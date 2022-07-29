import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Route, Router, Switch } from 'react-router-dom';
import Elevio from 'elevio/lib/react';
import Axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import ScrollToTop from '../../components/ScrollToTop';
import Home from '../Home';
import Synthesis from '../Synthesis';
import SupplierDetail from '../Synthesis/Supplier';
import Auth from '../../components/Auth/Auth';
import PageLoader from '../../components/PageLoader';
import NotFound from '../../components/NotFound';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchSellerSubscription, fetchSubscriptions } from '../../actions/Settings/Subscription';
import '../../analytics';
import ResetPassword from '../ResetPassword';
import Onboarding from '../Onboarding';
import Billing from '../Settings/Billing';
import APIConnectivity from '../Settings/APIConnectivity';
import SPConnectivity from '../Settings/SPConnectivity';
import SpApiListener from '../Settings/SPConnectivity/SpApiListener';
import Profile from '../Settings/Profile';
import ChurnFlow from '../ChurnFlow';
import FailedPaymentsBanner from '../../components/FailedPaymentsBanner';
import TrialRemainingBanner from '../../components/TrialRemainingBanner';
import YoutubeVideo from '../../components/YoutubeVideo';
import SellerResearch from '../SellerResearch';
import ProductResearch from '../ProductResearch';
import KeywordResearch from '../KeywordResearch';
import PerfectStock from '../PerfectStock';
import LeadTime from '../Settings/PerfectStockSettings/LeadTime';
import DaysOfInventory from '../Settings/PerfectStockSettings/DaysOfInventory';
import SkuSettings from '../Settings/PerfectStockSettings/SkuSettings';
import Containers from '../Settings/PerfectStockSettings/Containers';
import DutyTax from '../Settings/PerfectStockSettings/DutyTax';
import PaymentTerms from '../Settings/PerfectStockSettings/PaymentTerms';
import EmployeeExpenses from '../Settings/PerfectStockSettings/EmployeeExpenses';
import LaunchExpenses from '../Settings/PerfectStockSettings/LaunchExpenses';
import MiscExpenses from '../Settings/PerfectStockSettings/MiscExpenses';
import PpcExpenses from '../Settings/PerfectStockSettings/PpcExpenses';
import CashFlowReconcile from '../Settings/PerfectStockSettings/CashFlowReconcile';

import SellgoNewSubscription from '../NewSellgoSubscription';
import SellgoPaymentSuccess from '../NewSellgoSubscription/SellgoPaymentSuccess';
import SellgoFreeAccountForm from '../NewSellgoSubscription/SellgoFreeAccountForm';
import SellgoActivation from '../NewSellgoSubscription/SellgoActivation';
import SellgoActivationSuccess from '../NewSellgoSubscription/SellgoActivationSuccess';
import SellgoInappPayment from '../NewSellgoSubscription/SellgoInappPayment';
import SellgoUpsellCtaPage from '../UpsellCtaPage/Sellgo';
import SellgoPricing from '../Settings/Pricing/SellgoPricing';

import AistockNewSubscription from '../NewAistockSubscription';
import AistockPaymentSuccess from '../NewAistockSubscription/AistockPaymentSuccess';
import AistockFreeAccountForm from '../NewAistockSubscription/AistockFreeAccountForm';
import AistockActivation from '../NewAistockSubscription/AistockActivation';
import AistockActivationSuccess from '../NewAistockSubscription/AistockActivationSuccess';
import AistockInappPayment from '../NewAistockSubscription/AistockInappPayment';
import AistockUpsellCtaPage from '../UpsellCtaPage/Aistock';
import AistockPricing from '../Settings/Pricing/AistockPricing';

import BetaUsersActivationForm from '../BetaUsersActivation';
import MainHomePage from '../MainHomePage';

/* Utils */
import {
  isAistockSubscription,
  isBetaAccount,
  isSellgoSubscription,
  isSubscriptionIdFreeAccount,
  isSubscriptionIdFreeTrial,
} from '../../utils/subscriptions';
import { isAiStockSession, isSellgoSession } from '../../utils/session';
import { getSellerQuota } from '../../actions/Settings';
import { AppConfig } from '../../config';

export const auth = new Auth();

const AistockSubscriptionPages = {
  NewSubscription: AistockNewSubscription,
  PaymentSuccess: AistockPaymentSuccess,
  FreeAccountForm: AistockFreeAccountForm,
  Activation: AistockActivation,
  ActivationSuccess: AistockActivationSuccess,
  UpsellCtaPage: AistockUpsellCtaPage,
  Pricing: AistockPricing,
  Payment: AistockInappPayment,
};

const SellgoSubscriptionPages = {
  NewSubscription: SellgoNewSubscription,
  PaymentSuccess: SellgoPaymentSuccess,
  FreeAccountForm: SellgoFreeAccountForm,
  Activation: SellgoActivation,
  ActivationSuccess: SellgoActivationSuccess,
  UpsellCtaPage: SellgoUpsellCtaPage,
  Pricing: SellgoPricing,
  Payment: SellgoInappPayment,
};

const SubscriptionPages = isSellgoSession() ? SellgoSubscriptionPages : AistockSubscriptionPages;

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
    sellerQuota: state.settings.sellerQuota,
  }),
  // mapDispatchToProps
  {
    fetchSellerSubscription: () => fetchSellerSubscription(),
    fetchSubscriptions: () => fetchSubscriptions(),
    getSellerQuota: () => getSellerQuota(),
  }
)(
  ({
    component: Component,
    requireSubscription,
    sellerSubscription,
    sellerQuota,
    fetchSellerSubscription,
    fetchSubscriptions,
    getSellerQuota,
    location,
    ...rest
  }: any) => {
    const userIsAuthenticated = isAuthenticated();
    const isPaymentPending = sellerSubscription && sellerSubscription.is_payment_pending;
    const isFirstTimeUserLoggedIn =
      sellerSubscription && sellerSubscription.is_first_time_logged_in;

    // This effect will run if there is a change in sellerSubscription,
    // auth status, or route so that we can take the appropriate action.
    // TODO: Hoist this logic up to an AuthProvider that includes user's subscription as part
    // of auth object made available to all child components using context.
    useEffect(() => {
      getSellerQuota();

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
        fetchSubscriptions();
        return;
      }

      // if beta user account then deny access to settings
      if (location.pathname.includes('/settings') && isBetaAccount(sellerSubscription)) {
        history.push('/activate-beta-account');
      }

      // If quota exceeds for free account then redirect to activation
      if (
        isSellgoSession() &&
        isSubscriptionIdFreeAccount(sellerSubscription.subscription_id) &&
        window.location.pathname !== '/settings/pricing'
      ) {
        console.log(window.location.pathname);
        if (sellerQuota?.seller_research.available - sellerQuota?.seller_research.used <= 0) {
          history.push('/activation');
        }
      }

      if (
        isAiStockSession() &&
        isSubscriptionIdFreeTrial(sellerSubscription.subscription_id) &&
        window.location.pathname !== '/settings/pricing'
      ) {
        if (sellerSubscription.is_trial_expired) {
          history.push('/activation');
        }
      }

      // Redirect to in-app payment page for free trial users
      // instead of upgrade to annual plan page.
      if (
        isAiStockSession() &&
        isSubscriptionIdFreeTrial(sellerSubscription.subscription_id) &&
        window.location.pathname === '/settings/pricing'
      ) {
        // history.push is causing user unable to go back.
        // so for now using window.location.pathname.
        window.location.pathname = '/subscription/payment';
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
            <>
              <AdminLayout {...props}>
                {isFirstTimeUserLoggedIn &&
                  isSellgoSubscription(sellerSubscription.subscription_id) && (
                    <YoutubeVideo youtubeLink={AppConfig.ONBOARDING_VIDEO} />
                  )}
                {isAistockSubscription(sellerSubscription.subscription_id) &&
                  isSubscriptionIdFreeTrial(sellerSubscription.subscription_id) && (
                    <TrialRemainingBanner expiryDate={sellerSubscription.expiry_date} />
                  )}
                {isPaymentPending && (
                  <FailedPaymentsBanner paymentMode={sellerSubscription.payment_mode} />
                )}
                <Component {...props} />
              </AdminLayout>
            </>
          );
        }}
      />
    );
  }
);

function App() {
  const handleUpdateFaviconToAistock = () => {
    const faviconElement = document.getElementById('favicon');
    if (faviconElement && isAiStockSession()) {
      faviconElement.setAttribute('href', `${AppConfig.BASE_URL}/images/aistockFavicon.ico`);
    }
  };

  React.useEffect(() => {
    handleUpdateFaviconToAistock();
  }, []);

  const url = window.location.pathname;

  const loadElevio = () => {
    if (
      !isSellgoSession() &&
      url !== '/' &&
      !url.includes('/subscription') &&
      !url.includes('/signup') &&
      !url.includes('/reset-password')
    ) {
      return <Elevio accountId={AppConfig.ELEVIO_KEY} />;
    } else {
      return null;
    }
  };

  return (
    <div className="App__container">
      <Helmet>
        <title>{isSellgoSession() ? 'Sellgo App' : 'Aistock App'}</title>
      </Helmet>
      <Router history={history}>
        <ScrollToTop />
        {loadElevio()}

        <Switch>
          <Route
            exact={true}
            path="/"
            render={(renderProps) => <Home auth={auth} {...renderProps} />}
          />
          <Route
            path="/callback"
            render={(renderProps) => {
              handleAuthentication(renderProps.location);
              return <PageLoader pageLoading={true} />;
            }}
          />
          <Route
            exact={true}
            path="/reset-password"
            render={(renderProps) => <ResetPassword auth={auth} {...renderProps} />}
          />

          <Route
            exact={true}
            path="/subscription"
            render={(renderProps) => (
              <SubscriptionPages.NewSubscription auth={auth} {...renderProps} />
            )}
          />

          <Route
            exact={true}
            path="/signup"
            render={(renderProps) => (
              <SubscriptionPages.FreeAccountForm auth={auth} {...renderProps} />
            )}
          />

          <Route
            exact={true}
            path="/subscription/success"
            component={SubscriptionPages.PaymentSuccess}
          />

          <Route
            exact={true}
            path="/activation/success"
            render={(renderProps) => (
              <SubscriptionPages.ActivationSuccess auth={auth} {...renderProps} />
            )}
          />

          <Route
            exact={true}
            path="/activation/:activationCode"
            component={SubscriptionPages.Activation}
          />

          <Route exact={true} path="/activation" component={SubscriptionPages.UpsellCtaPage} />

          <Route
            exact={true}
            path="/subscription/payment"
            render={(renderProps) => <SubscriptionPages.Payment auth={auth} {...renderProps} />}
          />
          <PrivateRoute
            exact={true}
            path="/home"
            component={MainHomePage}
            requireSubscription={false}
          />
          <PrivateRoute
            exact={true}
            path="/onboarding"
            component={Onboarding}
            requireSubscription={true}
          />
          <PrivateRoute
            exact={true}
            path="/settings/pricing"
            component={SubscriptionPages.Pricing}
          />
          <PrivateRoute exact={true} path="/settings/billing" component={Billing} />
          <PrivateRoute exact={true} path="/settings/sp-connectivity" component={SPConnectivity} />
          <PrivateRoute exact={true} path="/settings/sp-api-listener" component={SpApiListener} />
          <PrivateRoute exact={true} path="/settings/api-keys" component={APIConnectivity} />
          <PrivateRoute exact={true} path="/settings/profile" component={Profile} />
          <PrivateRoute exact={true} path="/settings/aistock/lead-time" component={LeadTime} />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/days-of-inventory-settings"
            component={DaysOfInventory}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/sku-settings"
            component={SkuSettings}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/duty-tax-settings"
            component={DutyTax}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/payment-terms-settings"
            component={PaymentTerms}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/container-settings"
            component={Containers}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/employee-expenses-settings"
            component={EmployeeExpenses}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/product-launch-expenses-settings"
            component={LaunchExpenses}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/misc-expenses-settings"
            component={MiscExpenses}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/ppc-expenses-settings"
            component={PpcExpenses}
          />
          <PrivateRoute
            exact={true}
            path="/settings/aistock/cash-flow-reconcile-settings"
            component={CashFlowReconcile}
          />
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
          {/* <PrivateRoute
            exact={true}
            path="/product-tracker"
            component={ProductTracker}
            requireSubscription={true}
          /> */}
          {/* <PrivateRoute
            exact={true}
            path="/leads-tracker"
            component={LeadsTracker}
            requireSubscription={true}
          /> */}

          <PrivateRoute
            exact={true}
            path="/seller-research/:productName"
            component={SellerResearch}
            requireSubscription={true}
          />

          <PrivateRoute
            exact={true}
            path="/product-research/:productName"
            component={ProductResearch}
            requireSubscription={true}
          />

          <PrivateRoute
            exact={true}
            path="/keyword-research/:productName"
            component={KeywordResearch}
            requireSubscription={true}
          />

          <PrivateRoute
            exact={true}
            path="/aistock/:productName"
            component={PerfectStock}
            requireSubscription={true}
          />

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

          {/* <PrivateRoute
            exact={true}
            path="/account-setup"
            component={PilotLogin}
            requireSubscription={false}
          /> */}

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
