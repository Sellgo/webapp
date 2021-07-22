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

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setLogin();
      localStorage.setItem('isLoggedIn', 'false');
    } else if (window.location.search.indexOf('-unverified') !== -1) {
      setLogin();
    }
    const search = window.location.search.toLowerCase();

    // To refactor to use API calls instead
    let plan: string;
    if (search.includes('enterprise')) {
      plan = 'enterprise';
    } else if (search.includes('wholesalearbitrage$1')) {
      plan = 'wholesalearbitrage$1';
    } else if (search.includes('privatelabel$1')) {
      plan = 'privatelabel$1';
    } else if (search.includes('starter')) {
      plan = 'starter';
    } else if (search.includes('professional')) {
      plan = 'professional';
    } else if (search.includes('sellerscoutpro')) {
      plan = 'sellerscoutpro';
    } else {
      plan = 'team';
    }

    let paymentMode: string;
    if (search.includes('daily')) {
      paymentMode = 'daily';
    } else if (search.includes('monthly')) {
      paymentMode = 'monthly';
    } else {
      paymentMode = 'yearly';
    }

    setAccountType(plan);
    setPaymentMode(paymentMode);
    localStorage.setItem('planType', plan);
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
