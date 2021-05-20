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

const Subscription: React.FC<Props> = props => {
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
    const search = window.location.search;

    let plan: any = 'professional';
    if (search.includes('starter')) {
      plan = 'starter';
    } else if (search.includes('suite')) {
      plan = 'suite';
    } else {
      plan = 'professional';
    }

    const paymentMode = window.location.search.indexOf('yearly') !== -1 ? 'yearly' : 'monthly';

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

export default Subscription;
