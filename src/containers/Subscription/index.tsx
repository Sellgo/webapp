import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';

/* Containers */
import Summary from './Summary';
import Login from './Login';
import Signup from './Signup';

/* Components */
import Auth from '../../components/Auth/Auth';
import { fetchSubscriptions } from '../../actions/Settings/Subscription';

/* Assets */
import newSellgoLogo from '../../assets/images/sellgoNewLogo.png';

interface Props {
  auth: Auth;
  subscriptions: any;
  fetchSubscriptions: () => void;
}

const SubscriptionPage: React.FC<Props> = props => {
  const { auth, subscriptions, fetchSubscriptions } = props;

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(true);
  const [accountType, setAccountType] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('');

  const setSignUp = () => {
    window.location.search = '?type=' + accountType + '&' + 'mode=' + paymentMode;
    setIsSignup(true);
    setIsLogin(false);
  };

  const setLogin = () => {
    setIsLogin(true);
    setIsSignup(false);
  };

  /* Get valid subscription name from URL */
  const getSubscriptionName = (subscriptions: any[], search: string) => {
    for (let i = 0; i < subscriptions.length; i++) {
      const name = subscriptions[i].name.toLowerCase();
      const subscriptionName = name.replaceAll(' ', '');
      if (search.includes(subscriptionName)) {
        return subscriptionName;
      }
    }
    return '';
  };

  useEffect(() => {
    // Load subscriptions into redux.
    fetchSubscriptions();

    if (localStorage.getItem('isLoggedIn') === 'true') {
      setLogin();
      localStorage.setItem('isLoggedIn', 'false');
    } else if (window.location.search.indexOf('-unverified') !== -1) {
      setLogin();
    }

    const search = window.location.search.toLowerCase();
    const plan = getSubscriptionName(subscriptions, search);
    setAccountType(plan);
    localStorage.setItem('planType', plan);

    let paymentMode: string;
    if (search.includes('daily')) {
      paymentMode = 'daily';
    } else if (search.includes('monthly')) {
      paymentMode = 'monthly';
    } else {
      paymentMode = 'yearly';
    }

    setPaymentMode(paymentMode);
    localStorage.setItem('paymentMode', paymentMode);
  }, [subscriptions]);

  return (
    <>
      <main className={styles.subscriptionPage}>
        <div className={styles.logo}>
          <Link to="/" replace>
            <img src={newSellgoLogo} alt="Sellgo Company Logo" />
          </Link>
        </div>

        <section className={styles.contentSection}>
          <Summary planType={accountType} paymentMode={paymentMode} />
          {isLogin && <Login auth={auth} setSignup={setSignUp} />}
          {isSignup && <Signup auth={auth} setLogin={setLogin} />}
        </section>
      </main>
    </>
  );
};

const mapStateToProps = (state: {}) => ({
  subscriptions: get(state, 'subscription.subscriptions'),
});

const mapDispatchToProps = {
  fetchSubscriptions: () => fetchSubscriptions(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage);
