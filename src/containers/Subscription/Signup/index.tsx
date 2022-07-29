import React, { useState, useEffect } from 'react';
import { Header, Form, Modal, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import get from 'lodash/get';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Auth from '../../../components/Auth/Auth';
import StepsInfo from '../../../components/StepsInfo';

/* Containers */
import StepsContent from '../StepsContent';

/* Actions */
import { fetchTOS, fetchPP } from '../../../actions/UserOnboarding';

/* Hooks */
import { useInput } from '../../../hooks/useInput';

/* Constants */
import {
  passwordPolicy,
  strong,
  lowerUpper,
  alphanumeric,
  specialCharacters,
  Length,
  validateEmail,
  Name,
} from '../../../constants/Validators';

/* Types */
import { Steps } from '../../../interfaces/StepsInfo';

interface Props {
  auth: Auth;
  setLogin: () => void;
  termsOfService: any;
  privacyPolicy: any;
  fetchPP: any;
  fetchTOS: any;
}

interface State {
  stepsInfo: Steps[];
}

const Signup = (props: Props, state: State) => {
  const { auth, setLogin, termsOfService, privacyPolicy, fetchTOS, fetchPP } = props;

  const [verifySignupError, setVerifySignupError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const [isFocusPW, setFocusPassword] = useState(false);
  const [openTOS, setOpenTOS] = useState(false);
  const [openPP, setOpenPP] = useState(false);

  useEffect(() => {
    fetchTOS();
    fetchPP();
  }, [fetchTOS, fetchPP]);

  state = {
    stepsInfo: [
      {
        id: 1,
        stepShow: strong.validate(password) ? true : false,
        stepClass: 'title-success',
        stepTitle: 'Password Strength',
        stepDescription: `strong`,
        stepIcon: 'check',
      },
      {
        id: 2,
        stepShow: true,
        stepClass: lowerUpper.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Lowercase and Uppercase',
        stepDescription: 'Contains a capital letter and a non capital letter',
        stepIcon: lowerUpper.validate(password) ? 'check' : 'times',
      },
      {
        id: 3,
        stepShow: true,
        stepClass: alphanumeric.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Alphanumeric',
        stepDescription: 'Contains a number and letter',
        stepIcon: alphanumeric.validate(password) ? 'check' : 'times',
      },
      {
        id: 4,
        stepShow: true,
        stepClass: specialCharacters.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Special Characters',
        stepDescription: 'Contains at least one special character (e.g. !@#$%^&*,.)',
        stepIcon: specialCharacters.validate(password) ? 'check' : 'times',
      },
      {
        id: 5,
        stepShow: true,
        stepClass: Length.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Length',
        stepDescription: 'At least 8 characters',
        stepIcon: Length.validate(password) ? 'check' : 'times',
      },
    ],
  };

  function onBlur() {
    setFocusPassword(false);
  }

  function onFocus() {
    setFocusPassword(true);
  }

  const onClose = () => {
    setOpenTOS(false);
    setOpenPP(false);
  };

  const TOS = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Terms of Service</Header>
        <Form>
          <TextArea rows="20" value={termsOfService} />
        </Form>
      </div>
    );
  };

  const PP = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Privacy Policy</Header>
        <Form>
          <TextArea rows="20" value={privacyPolicy} />
        </Form>
      </div>
    );
  };

  const newUserExperiencePopup = () => {
    return (
      <Modal onClose={() => onClose()} size={'small'} open={openTOS || openPP}>
        <Modal.Content>
          {openTOS && <TOS />}
          {openPP && <PP />}
        </Modal.Content>
      </Modal>
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setEmailError(false);
    setFnameError(false);
    setLnameError(false);

    localStorage.removeItem('userId');

    if (!passwordPolicy.validate(password)) {
      setFocusPassword(true);
    } else if (!validateEmail(email)) {
      setVerifySignupError(true);
      setErrorMessage(`Email address is incorrect, please fix your email: ${email}`);
      setEmailError(true);
    } else if (!Name.validate(firstName)) {
      setErrorMessage('First name must all be letters.');
      setVerifySignupError(true);
      setFnameError(true);
    } else if (!Name.validate(lastName)) {
      setErrorMessage('Last name must all be letters.');
      setVerifySignupError(true);
      setLnameError(true);
    } else {
      /* Disable register button for awhile after submission */
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
      auth.webAuth.signup(
        {
          connection: 'Username-Password-Authentication',
          email: email,
          password: password,
          userMetadata: { first_name: firstName, last_name: lastName },
        },
        (err: any) => {
          if (err) {
            setVerifySignupError(true);
            setErrorMessage(err.description);
          } else {
            let data: any = {
              email: email.trim(), // trim out white spaces to prevent 500
              name: firstName + ' ' + lastName,
              first_name: firstName,
              last_name: lastName,
            };

            // @ts-ignore
            const referralID = typeof window !== 'undefined' && window.Rewardful.referral;

            if (referralID) {
              data = {
                ...data,
                referral: referralID,
              };
            }
            auth.getSellerID(data);
          }
        }
      );
    }
  };

  return (
    <section className={styles.registerContainer}>
      {newUserExperiencePopup()}

      <StepsContent contentType={'register'} />

      <h2>Register Here</h2>
      <form onSubmit={handleSubmit}>
        <Form.Input
          size="huge"
          label="Email"
          type="mail"
          placeholder="Email"
          {...bindEmail}
          error={emailError}
          className={styles.formInput}
        />

        <Form.Input
          size="huge"
          label="First Name"
          type="text"
          placeholder="First Name"
          required
          {...bindFirstName}
          error={fnameError}
          className={styles.formInput}
        />

        <Form.Input
          size="huge"
          label="Last Name"
          type="text"
          placeholder="Last Name"
          required
          {...bindLastName}
          error={lnameError}
          className={styles.formInput}
        />

        <Form.Field className={`${styles.formInput} ${styles.formInput__password}`}>
          <label htmlFor="password">Password</label>
          <StepsInfo
            id="password"
            subscriptionRegister={true}
            isFocusPW={isFocusPW}
            focusInput={onFocus}
            blurInput={onBlur}
            stepsData={state.stepsInfo}
            {...bindPassword}
          />
        </Form.Field>

        <div className={styles.errorMessage}>
          {verifySignupError ? <span>{errorMessage}</span> : <span />}
        </div>

        <button className={styles.submitButton} type="submit" disabled={loading}>
          Register
        </button>

        <p className={styles.consent}>
          By signing up, you’re agreeing to our{' '}
          <span
            onClick={() => {
              setOpenTOS(true);
            }}
          >
            Terms of Service
          </span>{' '}
          and you have read our{' '}
          <span
            onClick={() => {
              setOpenPP(true);
            }}
          >
            data use policy
          </span>{' '}
          as well as the use of cookies.
        </p>

        <div className={styles.divider} />

        <p className={styles.loginMessage}>
          Already have a Sellgo account?{' '}
          <span
            onClick={() => {
              setLogin();
            }}
          >
            Log in
          </span>
        </p>
      </form>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  termsOfService: get(state, 'userOnboarding.termsOfService'),
  privacyPolicy: get(state, 'userOnboarding.privacyPolicy'),
});

const mapDispatchToProps = {
  fetchTOS: () => fetchTOS(),
  fetchPP: () => fetchPP(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
