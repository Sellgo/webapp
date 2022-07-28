import React from 'react';
import { Form, Header, Modal, TextArea, Loader } from 'semantic-ui-react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import Axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Testimonial from '../../../../components/Testimonial';

/* Assets */
import newSellgoLogo from '../../../../assets/images/aistockLogo.png';

/* Constants */
import { validateEmail } from '../../../../constants/Validators';

/* Actions */
import { fetchTOS, fetchPP } from '../../../../actions/UserOnboarding';

/* Utils */
import { decodeBase64 } from '../../../../utils/format';

/* Data */
import { TESTIMONIAL } from '../data';
import { AppConfig } from '../../../../config';

interface Props {
  handleUpdateEmail: (email: string) => void;
  handleGoToNextStep: () => void;
  termsOfService: any;
  privacyPolicy: any;
}

const FreeAccountForm = (props: Props) => {
  const { handleUpdateEmail, handleGoToNextStep, termsOfService, privacyPolicy } = props;
  const urlParams = new URLSearchParams(window.location.search);
  const [email, setEmail] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [openTOS, setOpenTOS] = React.useState<boolean>(false);
  const [openPP, setOpenPP] = React.useState<boolean>(false);

  /* Obtaining email url */
  React.useEffect(() => {
    const email = urlParams.get('email');
    if (email) {
      setEmail(decodeBase64(email));
    }
  }, []);

  /* ---------------------------------------- */
  /* -------------- TOS --------------------- */
  /* ---------------------------------------- */
  React.useEffect(() => {
    fetchTOS();
    fetchPP();
  }, [fetchTOS, fetchPP]);

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

  const handleSubmitEmail = async () => {
    setIsLoading(true);

    /* Validate email format */
    if (!validateEmail(email)) {
      setErrorMessage(`Email address is incorrect, please fix your email: ${email}`);
      setIsLoading(false);
      return;
    }

    try {
      /* Verify email */
      const { status: verifyEmailStatus } = await Axios.get(
        `${AppConfig.BASE_URL_API}checkout/verify-email/${email.toLowerCase()}`
      );

      if (verifyEmailStatus !== 200) {
        setErrorMessage(`This email ${email} is already being used.`);
        setIsLoading(false);
        return;
      }

      /* Update email */
      handleUpdateEmail(email);
      handleGoToNextStep();
    } catch (e) {
      setErrorMessage(`This email ${email} is already being used.`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <main className={styles.activationPage}>
      {newUserExperiencePopup()}
      <section className={styles.activationFormSection}>
        <img src={newSellgoLogo} className={styles.logo} alt="Sellgo Company Logo" />
        <div className={styles.activationForm}>
          <p className={styles.formHeader}>Your information</p>
          <Form.Input
            size="huge"
            label="Email*"
            type="mail"
            placeholder="Your email"
            value={email}
            className={styles.formInput}
            onChange={e => setEmail(e.target.value)}
          />
          <p className={styles.error}>{errorMessage}</p>
          <button className={styles.submitButton} onClick={handleSubmitEmail} disabled={isLoading}>
            Continue&nbsp;
            <Loader active={isLoading} inline inverted size="mini" />
          </button>
        </div>
      </section>
      <Testimonial
        testimonialTitle={TESTIMONIAL.title}
        testimonial={TESTIMONIAL.testimonial}
        authorImg={TESTIMONIAL.authorImg}
        authorName={TESTIMONIAL.authorName}
        authorTitle={TESTIMONIAL.authorTitle}
      />
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
