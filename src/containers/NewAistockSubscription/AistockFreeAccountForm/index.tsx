import React from 'react';
import { Form, Header, Modal, TextArea, Checkbox, Loader } from 'semantic-ui-react';
import { get } from 'lodash';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Auth from '../../../components/Auth/Auth';

/* Assets */
import newSellgoLogo from '../../../assets/images/aistockLogo.png';
import chromeExtensionExample from '../../../assets/images/chromeExample.png';
import chromeExtensionIcon from '../../../assets/images/rainbowChromeLogo.svg';
import Dots from '../../../assets/images/hex-neural.svg';

/* Components */
import StepsInfo from '../../../components/StepsInfo';

/* Hooks */
import { useInput } from '../../../hooks/useInput';

/* Constants */
import { passwordPolicy, Length } from '../../../constants/Validators';
import { FREE_TRIAL_SUBSCRIPTION_ID } from '../../../constants/Subscription/AiStock';

/* Actions */
import { fetchTOS, fetchPP } from '../../../actions/UserOnboarding';

/* Utils */
import { decodeBase64 } from '../../../utils/format';

interface Props {
  match: any;
  history: any;
  termsOfService: any;
  privacyPolicy: any;
  fetchPP: any;
  fetchTOS: any;
  auth: Auth;
}

const FreeAccountForm = (props: Props) => {
  const { auth, termsOfService, privacyPolicy, fetchPP, fetchTOS } = props;
  const urlParams = new URLSearchParams(window.location.search);
  const [email, setEmail] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [isFocusPW, setFocusPassword] = React.useState<boolean>(false);
  const { value: password, bind: bindPassword } = useInput('');
  const { value: password2, bind: bindPassword2 } = useInput('');

  const [openTOS, setOpenTOS] = React.useState<boolean>(false);
  const [openPP, setOpenPP] = React.useState<boolean>(false);
  const [isAgreedToTerms, setAgreedToTerms] = React.useState<boolean>(false);

  /* ---------------------------------------- */
  /* -------------- TOS --------------------- */
  /* ---------------------------------------- */
  React.useEffect(() => {
    fetchTOS();
    fetchPP();
  }, [fetchTOS, fetchPP]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const handleTermsChange = (e: any, data: any) => {
    if (data.checked) {
      setAgreedToTerms(true);
    } else {
      setAgreedToTerms(false);
    }
  };

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

  /* ---------------------------------------- */
  /* --------- PASSWORD VALIDATION ---------- */
  /* ---------------------------------------- */
  const stepsInfo = [
    {
      id: 1,
      stepShow: true,
      stepClass: Length.validate(password) ? 'title-success' : 'title-error',
      stepTitle: 'Length',
      stepDescription: 'At least 6 characters',
      stepIcon: Length.validate(password) ? 'check' : 'times',
    },
  ];

  /* Obtaining email url */
  React.useEffect(() => {
    const email = urlParams.get('email');
    if (email) {
      setEmail(decodeBase64(email));
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (!passwordPolicy.validate(password)) {
      setFocusPassword(true);
      setLoading(false);
      return;
    } else if (password !== password2) {
      setErrorMessage(`Passwords do not match.`);
      setLoading(false);
      return;
    } else if (!isAgreedToTerms) {
      setErrorMessage(`Please agree to the terms and conditons.`);
      setLoading(false);
      return;
    } else if (!name) {
      setErrorMessage(`Please enter your name.`);
      setLoading(false);
      return;
    }

    /* After successful sign up, auth.getSellerID will change the page */
    auth.webAuth.signup(
      {
        connection: 'Username-Password-Authentication',
        email: email.toLowerCase(),
        password: password,
        userMetadata: {
          first_name: name,
          last_name: name,
        },
      },
      (err: any) => {
        if (err) {
          // This should not happen
          setErrorMessage(err.description);
          setLoading(false);
          return;
        } else {
          // Successful Signup
          const data: any = {
            email: email.trim().toLowerCase(), // trim out white spaces to prevent 500
            name: name,
            first_name: name,
            last_name: '',
            subscription_id: FREE_TRIAL_SUBSCRIPTION_ID,
            password: password,
          };
          auth.getSellerID(data, 'freeAccountSignup');
        }
      }
    );
  };

  return (
    <main className={styles.activationPage}>
      {newUserExperiencePopup()}
      <section className={styles.activationFormSection}>
        <img src={newSellgoLogo} className={styles.logo} alt="Sellgo Company Logo" />
        <div className={styles.activationForm}>
          <img src={Dots} alt="dots" className={styles.dots} />
          <p className={styles.formHeader}>Sign up to AiStock</p>
          <Form.Input
            size="huge"
            label="Your Name"
            type="text"
            placeholder="Your Name"
            value={name}
            className={styles.formInput}
            onChange={e => setName(e.target.value)}
          />
          <Form.Input
            size="huge"
            label="Email"
            type="mail"
            placeholder="Email"
            value={email}
            className={styles.formInput}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Field className={`${styles.formInput} ${styles.formInput__password}`}>
            <label htmlFor="password">Password*</label>
            <StepsInfo
              id="password"
              subscriptionRegister={true}
              isFocusPW={isFocusPW}
              focusInput={() => setFocusPassword(true)}
              blurInput={() => setFocusPassword(false)}
              stepsData={stepsInfo}
              {...bindPassword}
            />
          </Form.Field>
          <Form.Input
            size="huge"
            label="Confirm Password*"
            type="password"
            placeholder="Confirm Password"
            required
            {...bindPassword2}
            className={styles.formInput}
          />

          <div className={styles.consent}>
            <Checkbox onChange={handleTermsChange} />
            <p>
              By signing up, you’re agreeing to our&nbsp;
              <span
                onClick={() => {
                  setOpenTOS(true);
                }}
              >
                terms of service&nbsp;
              </span>
              and you have read our&nbsp;
              <span
                onClick={() => {
                  setOpenPP(true);
                }}
              >
                data use policy&nbsp;
              </span>
              as well as the use of cookies.
            </p>
          </div>
          <p className={styles.error}>{errorMessage}</p>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={isLoading}>
            Sign Up&nbsp;
            <Loader active={isLoading} inline inverted size="mini" />
          </button>
        </div>
      </section>
      <section className={styles.chromeExtensionCTASection}>
        <img
          className={styles.chromeExtensionDisplay}
          src={chromeExtensionExample}
          alt="chrome-extension-pic"
        />
        <p className={styles.chromeExtensionDesc}>
          Private Label entrepreneurs, Wholesale resellers, and service providers use our extension
          to estimate sales &#38; search terms directly from Amazon.
        </p>
        <a
          href="https://chrome.google.com/webstore/detail/sellgo-extension/gldmigoakdolonchebfnmcfbjihelcec"
          className={styles.chromeExtensionButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={chromeExtensionIcon} alt="chromeExtensionIcon" />
          Get Sellgo Chrome Extension
        </a>
      </section>
    </main>
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

export default connect(mapStateToProps, mapDispatchToProps)(FreeAccountForm);
