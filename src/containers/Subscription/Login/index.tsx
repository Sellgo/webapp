import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

/* Containers */
import StepsContent from '../StepsContent';

/* Components */
import Auth from '../../../components/Auth/Auth';

/* Hooks */
import { useInput } from '../../../hooks/useInput';

/* Styling */
import styles from './index.module.scss';

interface Props {
  auth: Auth;
  setSignup: () => void;
}

const Login: React.FC<Props> = props => {
  const { auth, setSignup } = props;

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isSignupSuccess, setSignupSuccess] = useState(
    window.location.search === '?signup=success'
  );

  const { value: username, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const enableErrorMessage = (message: string) => {
    setError(true);
    setSignupSuccess(false);
    setErrorMessage(message);
  };

  const redirectPath = localStorage.getItem('loginRedirectPath');

  useEffect(() => {
    if (redirectPath && redirectPath.indexOf('-unverified') !== -1) {
      enableErrorMessage('Please verify your email before logging in.');
      localStorage.setItem('loginRedirectPath', '/');
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const search = window.location.search;
    localStorage.setItem('loginRedirectPath', '/subscription/payment' + search);
    auth.webAuth.login(
      {
        responseType: 'token',
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
      },
      err => {
        if (err) {
          resetPassword();
          enableErrorMessage('Incorrect Username or Password!');
        }
      }
    );
  };

  return (
    <section className={styles.loginContainer}>
      <StepsContent contentType={'login'} loggedIn={true} />

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Form.Input
          size="huge"
          label="Email"
          type="mail"
          placeholder="Email"
          {...bindUserName}
          className={styles.formInput}
          required
        />
        <Form.Input
          size="huge"
          label="Password"
          type="password"
          placeholder="Password"
          {...bindPassword}
          className={styles.formInput}
          required
        />

        {isError && (
          <div className={styles.errorMessage}>
            <span>{errorMessage}</span>
          </div>
        )}

        {!isError && isSignupSuccess && (
          <div className={styles.successMessage}>
            <span>A link to verify your email has been sent to your email</span>
          </div>
        )}

        <button className={styles.submitButton} type="submit">
          Log in
        </button>

        <div className={styles.divider} />

        <p className={styles.registerMessage}>
          Need an account?{' '}
          <span
            onClick={() => {
              setSignup();
            }}
          >
            Register Here
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
