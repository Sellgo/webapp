import React from 'react';
import { Form, Header, Modal, TextArea, Loader } from 'semantic-ui-react';
import { get } from 'lodash';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Auth from '../../../components/Auth/Auth';

/* Assets */
import sellgoGradientLogo from '../../../assets/images/sellgoGradientLogo.png';
import ProfilePicture from '../../../assets/images/justin.png';

/* Components */
import StepsInfo from '../../../components/StepsInfo';

/* Hooks */
import { useInput } from '../../../hooks/useInput';

/* Constants */
import { passwordPolicy, Length, validateEmail, isFreeEmail } from '../../../constants/Validators';
// import { FREE_ACCOUNT_SUBSCRIPTION_ID } from '../../../constants/Subscription/Sellgo';

/* Actions */
import { fetchTOS, fetchPP } from '../../../actions/UserOnboarding';

/* Utils */
import { decodeBase64 } from '../../../utils/format';
import axios from 'axios';
import { AppConfig } from '../../../config';
import { error } from '../../../utils/notifications';

interface Props {
  match?: any;
  history?: any;
  termsOfService: any;
  privacyPolicy: any;
  fetchPP: any;
  fetchTOS: any;
  auth?: Auth;
  setStep: (a: number) => void;
  setUserEmail: (a: string) => void;
  setUserPassword: (a: string) => void;
  setUserName: (a: string) => void;
}

const FreeAccountForm = (props: Props) => {
  const {
    // auth,
    termsOfService,
    privacyPolicy,
    fetchPP,
    fetchTOS,
    setStep,
    setUserEmail,
    setUserPassword,
    setUserName,
  } = props;
  const urlParams = new URLSearchParams(window.location.search);
  const [email, setEmail] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [isFocusPW, setFocusPassword] = React.useState<boolean>(false);
  const { value: password, bind: bindPassword } = useInput('');
  const { value: password2, bind: bindPassword2 } = useInput('');

  const [openTOS, setOpenTOS] = React.useState<boolean>(false);
  const [openPP, setOpenPP] = React.useState<boolean>(false);

  /* ---------------------------------------- */
  /* -------------- TOS --------------------- */
  /* ---------------------------------------- */
  React.useEffect(() => {
    fetchTOS();
    fetchPP();
  }, [fetchTOS, fetchPP]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

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

  const sendDataToDrip = async () => {
    try {
      /* Verify email */
      const dripFormData = new FormData();
      dripFormData.append('email', email);
      dripFormData.append('firstname', name?.split(' ')?.[0] ?? '');
      dripFormData.append('lastname', name?.split(' ')?.[1] ?? '');
      dripFormData.append('drop_off_point', 'Signup');

      await axios.post(AppConfig.BASE_URL_API + `sellers/create-hubspot`, dripFormData);
    } catch (e) {
      console.log('Error sending to drip => ', e);
      return;
    }
  };

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
    } else if (!name) {
      setErrorMessage(`Please enter your name.`);
      setLoading(false);
      return;
    } else if (!validateEmail(email)) {
      setErrorMessage(`error in email - email format validation failed: ${email}`);
      setLoading(false);
      return;
    } else if (isFreeEmail(email.split('@')[1])) {
      setErrorMessage(`Please use email with business domain.`);
      setLoading(false);
      return;
    }
    try {
      /* Verify email */
      const { status: verifyEmailStatus } = await axios.get(
        `${AppConfig.BASE_URL_API}checkout/verify-email/${email.toLowerCase()}`
      );
      if (verifyEmailStatus !== 200) {
        error('This email is already being used');
        setLoading(false);
        return;
      }
    } catch (e) {
      error('This email is already being used');
      setLoading(false);
      return;
    }
    sendDataToDrip();
    setUserName(name);
    setUserEmail(email);
    setUserPassword(password);
    setLoading(false);
    setStep(2);
  };

  return (
    <>
      <p className={styles.label}>Start hitting your sales number in two clicks</p>
      <main className={styles.activationPage}>
        {newUserExperiencePopup()}
        <section className={styles.activationFormSection}>
          <div className={styles.activationForm}>
            <p className={styles.formHeader}>Easy sign up</p>
            <Form.Input
              size="huge"
              label="Name"
              type="text"
              placeholder="Your Name"
              value={name}
              className={styles.formInput}
              onChange={e => setName(e.target.value)}
            />
            <Form.Input
              size="huge"
              label="Business Email*"
              type="mail"
              placeholder="Business Email"
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
              Create my account&nbsp;
              <Loader active={isLoading} inline inverted size="mini" />
            </button>
            <p className={styles.signIn}>
              Have an account? <a href="/">Sign in</a>
            </p>
          </div>
        </section>
        <section className={styles.reviewsSection}>
          <img src={sellgoGradientLogo} className={styles.logo} alt="Sellgo Company Logo" />

          <h2>The most comprehensive Amazon seller leads database!</h2>
          <p>
            "We have very aggressive revenue growth targets. We knew that we needed Sellgo seller
            database that would enable us to scale, and help us to deliver on our goals."
          </p>

          <div className={styles.reviewerRow}>
            <img src={ProfilePicture} alt="profile picture" />
            <div className={styles.reviewerDetails}>
              Justin Willhite
              <br />
              <span>Amazon Product Content Creator</span>
            </div>
          </div>
        </section>
        <div className={styles.copyrightFooter}>
          <button
            onClick={() => {
              setOpenTOS(true);
            }}
          >
            Terms of Service
          </button>
          <button
            onClick={() => {
              setOpenPP(true);
            }}
          >
            Privacy Policy&nbsp;
          </button>
          <span>Copyright @ Sellgo 2022</span>
        </div>
      </main>
    </>
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
