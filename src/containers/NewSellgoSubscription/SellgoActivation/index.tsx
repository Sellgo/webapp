import React from 'react';
import { Form, Header, Modal, TextArea, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import { get } from 'lodash';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import newSellgoLogo from '../../../assets/images/SellgoNewestLogo.png';
import aistockLogo from '../../../assets/images/aistockLogo.png';
import chromeExtensionExample from '../../../assets/images/chromeExample.png';
import chromeExtensionIcon from '../../../assets/images/rainbowChromeLogo.svg';
import Dots from '../../../assets/images/hex-neural.svg';

/* Config */
import { AppConfig } from '../../../config';

/* Components */
import StepsInfo from '../../../components/StepsInfo';

/* Hooks */
import { useInput } from '../../../hooks/useInput';

/* Constants */
import {
  passwordPolicy,
  strong,
  lowerUpper,
  alphanumeric,
  Length,
} from '../../../constants/Validators';

/* Actions */
import { fetchTOS, fetchPP } from '../../../actions/UserOnboarding';

interface Props {
  match: any;
  history: any;
  termsOfService: any;
  privacyPolicy: any;
  fetchPP: any;
  fetchTOS: any;
}

const Activation = (props: Props) => {
  const { history, match, termsOfService, privacyPolicy, fetchPP, fetchTOS } = props;
  const urlParams = new URLSearchParams(window.location.search);
  const isAiStock = urlParams.has('is-aistock') && urlParams.get('is-aistock') === 'true';
  const activationCode = match.params.activationCode;
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
      stepShow: strong.validate(password) ? true : false,
      stepClass: 'title-success',
      stepTitle: 'Password Strength',
      stepDescription: `strong`,
      stepIcon: 'check',
    },
    {
      id: 2,
      stepShow: false,
      stepClass: lowerUpper.validate(password) ? 'title-success' : 'title-error',
      stepTitle: 'Lowercase and Uppercase',
      stepDescription: 'Contains a capital letter and a non capital letter',
      stepIcon: lowerUpper.validate(password) ? 'check' : 'times',
    },
    {
      id: 3,
      stepShow: false,
      stepClass: alphanumeric.validate(password) ? 'title-success' : 'title-error',
      stepTitle: 'Alphanumeric',
      stepDescription: 'Contains a number and letter',
      stepIcon: alphanumeric.validate(password) ? 'check' : 'times',
    },
    {
      id: 4,
      stepShow: true,
      stepClass: Length.validate(password) ? 'title-success' : 'title-error',
      stepTitle: 'Length',
      stepDescription: 'At least 6 characters',
      stepIcon: Length.validate(password) ? 'check' : 'times',
    },
  ];

  /* Obtaining email and name from activation code */
  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const URL = `${AppConfig.BASE_URL_API}checkout/retrieve-user-info/${activationCode}`;
        const response = await axios.get(URL);
        const { data } = response;
        const { email, first_name, last_name } = data;
        setEmail(email);

        if (!isAiStock) {
          setName(`${first_name} ${last_name}`);
        }
      } catch (err) {
        console.error('Unable to retrieve user information');
        history.push('/');
      }
    };

    getUserInfo();
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
      setErrorMessage(`Please agree to the terms and conditions.`);
      setLoading(false);
      return;
    } else if (!name && isAiStock) {
      setErrorMessage(`Please enter your name.`);
      setLoading(false);
      return;
    }

    /* ------------------------------------------------------------------- */
    /* -------------- ACTIVATION FOR NORMAL SELLGO ACCOUNTS--------------- */
    /* ------------------------------------------------------------------- */
    if (!isAiStock) {
      try {
        const payload = {
          email,
          password,
          activation_code: activationCode,
        };
        const URL = `${AppConfig.BASE_URL_API}checkout/activate`;
        const response = await axios.post(URL, payload);
        const { status } = response;
        if (status === 200) {
          history.push({
            pathname: '/activation/success',
            state: { email: email, password: password },
          });
        } else {
          setErrorMessage(`Failed to activate account. Please contact support@sellgo.com`);
        }
      } catch (err) {
        setErrorMessage(`Failed to activate account. Please contact support@sellgo.com`);
      }
    } else {
      /* ------------------------------------------------------------------- */
      /* ----------------- ACTIVATION FOR AI STOCK ACCOUNTS----------------- */
      /* ------------------------------------------------------------------- */
      try {
        const payload = {
          name,
          email,
          password,
          activation_code: activationCode,
        };
        const URL = `${AppConfig.BASE_URL_API}checkout/aistock/activate`;
        const response = await axios.post(URL, payload);
        const { status } = response;
        if (status === 200) {
          history.push({
            pathname: '/activation/success',
            state: { email: email, password: password, isAiStock: true },
          });
        } else {
          setErrorMessage(`Failed to activate account. Please contact support@aistock.co`);
        }
      } catch (err) {
        setErrorMessage(`Failed to activate account. Please contact support@aistock.co`);
      }
    }
    setLoading(false);
  };

  return (
    <main className={styles.activationPage}>
      {newUserExperiencePopup()}
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
      <section className={styles.activationFormSection}>
        <img
          src={isAiStock ? aistockLogo : newSellgoLogo}
          className={styles.logo}
          alt="Sellgo Company Logo"
        />
        <div className={styles.activationForm}>
          <img src={Dots} alt="dots" className={styles.dots} />
          <p className={styles.formHeader}>
            {!isAiStock ? `Set Name & Password` : `Set Up Your Beta Account`}
          </p>
          <Form.Input
            size="huge"
            label="Your Name"
            type="text"
            placeholder="Your Name"
            value={name}
            className={styles.formInput}
            onChange={e => setName(e.target.value)}
            disabled={!isAiStock}
          />
          <Form.Input
            size="huge"
            label="Email"
            type="mail"
            placeholder="Email"
            value={email}
            className={styles.formInput}
            disabled
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
                Terms of Service&nbsp;
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
            {isAiStock ? 'Activate Your Beta Account' : 'Register'}
          </button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activation);
