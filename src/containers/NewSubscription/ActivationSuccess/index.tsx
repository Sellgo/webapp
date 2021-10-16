import React from 'react';

import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import newSellgoLogo from '../../../assets/images/sellgoNewLogo.png';

/* Components */
import Auth from '../../../components/Auth/Auth';

interface Props {
  auth: Auth;
  location: any;
}

const ActivationSuccess = (props: Props) => {
  const history = createBrowserHistory({ forceRefresh: true });
  const { auth, location } = props;

  /* Email and password should be passed from history.push in Activation component */
  const { email, password } = location.state;

  if (!email || !password) {
    history.push('/');
  }

  const handleLogin = () => {
    auth.webAuth.login(
      {
        responseType: 'token',
        realm: 'Username-Password-Authentication',
        username: email,
        password: password,
      },
      (err: any) => {
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log('Success!');
        }
      }
    );
  };
  return (
    <main className={styles.successPage}>
      <div className={styles.logo}>
        <img src={newSellgoLogo} alt="Sellgo Company Logo" />
      </div>
      <section className={styles.successContainer}>
        <h2>Congratulations!</h2>
        <br />
        <p>
          Your Account is activated.
          <br />
          <br />
          We are excited to be Amazon seller's best friend! Our product is incredibly easy to use
          with a simple interface
        </p>

        <button
          onClick={() => {
            localStorage.setItem('loginRedirectPath', '/');
            handleLogin();
          }}
        >
          Login
        </button>
      </section>
    </main>
  );
};

export default ActivationSuccess;
