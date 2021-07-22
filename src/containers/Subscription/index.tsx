import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';

/* Containers */
import Summary from './Summary';
import Login from './Login';
import Signup from './Signup';

/* Components */
import Auth from '../../components/Auth/Auth';
import { subscriptionPlans, paymentModes, subscriptionDetails } from './data';

/* Assets */
import newSellgoLogo from '../../assets/images/sellgoNewLogo.png';

interface Props {
  auth: Auth;
}

const SubscriptionPage: React.FC<Props> = props => {
  const { auth } = props;

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
  const getSubscriptionNameAndPaymentMode = (search: string) => {
    /* Parsing to obtain plan type */
    const LENGTH_OF_SEARCH_STRING = 5; // Length of "type=", and "mode="
    const DEFAULT_PLAN = 'professional';
    const DEFAULT_PAYMENT_MODE = 'monthly';
    const startTypeIndex = search.indexOf('type=') + LENGTH_OF_SEARCH_STRING;
    let endTypeIndex = search.indexOf('&', startTypeIndex);
    if (endTypeIndex === -1) {
      endTypeIndex = search.length;
    }

    let subscriptionName = search.substring(startTypeIndex, endTypeIndex);
    if (!subscriptionPlans[subscriptionName]) {
      subscriptionName = DEFAULT_PLAN;
    }

    /* Parsing to obtain payment mode */
    const startModeIndex = search.indexOf('mode=') + LENGTH_OF_SEARCH_STRING;
    let endModeIndex = search.indexOf('&', startModeIndex);
    if (endModeIndex === -1) {
      endModeIndex = search.length;
    }

    let paymentMode = search.substring(startModeIndex, endModeIndex);
    if (!paymentModes.includes(paymentMode)) {
      paymentMode = DEFAULT_PAYMENT_MODE;
    }

    /* If plan mode does not match an available payment method, return default plan
    e.g. type=Seller Scout Pro, with mode=daily */
    //@ts-ignore
    const planCost = subscriptionDetails[subscriptionName][paymentMode];
    if (planCost === -1) {
      return {
        subscriptionName: DEFAULT_PLAN,
        paymentMode: DEFAULT_PAYMENT_MODE,
      };
    } else {
      return {
        subscriptionName,
        paymentMode,
      };
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setLogin();
      localStorage.setItem('isLoggedIn', 'false');
    } else if (window.location.search.indexOf('-unverified') !== -1) {
      setLogin();
    }

    const search = window.location.search.toLowerCase();
    const { subscriptionName, paymentMode } = getSubscriptionNameAndPaymentMode(search);

    setAccountType(subscriptionName);
    localStorage.setItem('planType', subscriptionName);
    setPaymentMode(paymentMode);
    localStorage.setItem('paymentMode', paymentMode);
  }, []);

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

export default SubscriptionPage;
