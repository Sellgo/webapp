import React from 'react';
import { Form, Header, Modal, TextArea, Loader } from 'semantic-ui-react';
import { get } from 'lodash';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Auth from '../../../components/Auth/Auth';

/* Assets */
import newSellgoLogo from '../../../assets/images/aistockLogo.png';
//import ProfilePicture from '../../../assets/images/andrew.png';

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
          is_aistock: 'true',
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
          <p className={styles.formHeader}>Create a free trial account</p>
          <Form.Input
            size="huge"
            label="Name*"
            type="text"
            placeholder="Your name"
            value={name}
            className={styles.formInput}
            onChange={e => setName(e.target.value)}
          />
          <Form.Input
            size="huge"
            label="Email*"
            type="mail"
            placeholder="Your email"
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
            Sign up now&nbsp;
            <Loader active={isLoading} inline inverted size="mini" />
          </button>
          <p className={styles.signIn}>
            Have an account? <a href="/">Sign in</a>
          </p>
        </div>
      </section>
      <section className={styles.reviewsSection}>
        <h2>The 1st inventory planning for Amazon sellers!</h2>
        <p>
          "AiStock gives our supply chain one place to get whatever help we need. It gives us a
          single point of integration for all our logistic process, helping us focus on increasing
          sales and launch new products as we grow."
        </p>

        <div className={styles.reviewerRow}>
          {/*<img src={ProfilePicture} alt="profile picture" />*/}
          <div className={styles.reviewerDetails}>
            Jack Y
            <br />
            <span>7-figure Brand Entrepreneur</span>
          </div>
        </div>
      </section>
      <div className={styles.copyrightFooter}>
        <button
          onClick={() => {
            setOpenTOS(true);
          }}
        >
          Terms of service
        </button>
        <button
          onClick={() => {
            setOpenPP(true);
          }}
        >
          Privacy policy&nbsp;
        </button>
        <span>Copyright @ AiStock 2022</span>
      </div>
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
