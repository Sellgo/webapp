import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Header, Modal, Form, TextArea } from 'semantic-ui-react';
import get from 'lodash/get';
import history from '../../../history';
import { fetchTOS, fetchPP } from '../../../actions/UserOnboarding';

/* Styling */
import styles from './index.module.scss';

/* components */
import ActionButton from '../../../components/ActionButton';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';
import MigrationDisplay from '../../../assets/images/aistockPremigrationDisplay.png';

const SellgoPilotOnboarding = (props: any) => {
  const { auth, termsOfService, privacyPolicy, fetchTOS, fetchPP, location } = props;

  const [openTOS, setOpenTOS] = useState(false);
  const [openPP, setOpenPP] = useState(false);

  useEffect(() => {
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
  let email: any, password: any;

  if (location.state) {
    email = location.state.email;
    password = location.state.password;
  }
  const redirectAndLogin = () => {
    history.push({
      pathname: '/activation/pilot/onboarding',
    });
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
    <>
      <main className={styles.pilotOnboardingPage}>
        <div className={styles.leftSection}>
          <h2>Let&apos;s start the migration, it&apos;s fast, easy and secure!</h2>
          <p>
            Connecting your Amazon account to AiStock will unlock the power of automation to your
            supply chain system.
          </p>
          <p>Once connected, you'll be able to:</p>
          <div className={styles.benefitRow}>
            <Icon name="checkmark" color="purple" />
            <div className={styles.benefitText}>
              <p>Knowing when you&apos;re at risk of stockout</p>
              <span>with our alert automation tool.</span>
            </div>
          </div>
          <div className={styles.benefitRow}>
            <Icon name="checkmark" color="purple" />
            <div className={styles.benefitText}>
              <p>Knowing what your future sales</p>
              <span>with our sales forecasting.</span>
            </div>
          </div>
          <div className={styles.benefitRow}>
            <Icon name="checkmark" color="purple" />
            <div className={styles.benefitText}>
              <p>Knowing when to place your next orders</p>
              <span>with our order planning tool.</span>
            </div>
          </div>
          <div className={styles.privacyInformation}>
            <Icon name="lock" color="black" size="big" />
            <span>
              AiStock is committed to maintaining the highest standard for security in order that
              your valuable data can be kept safe and secure at channel and at storage. We promise
              that we will never share your data with others. You can read more on our{' '}
              <span className={styles.popupButton} onClick={() => setOpenTOS(true)}>
                Terms of Service
              </span>{' '}
              and{' '}
              <span className={styles.popupButton} onClick={() => setOpenPP(true)}>
                Privacy Policy
              </span>
              .
            </span>
          </div>
          <ActionButton
            variant={'primary'}
            size="md"
            type="purpleGradient"
            className={styles.migrateButton}
            onClick={redirectAndLogin}
          >
            Continue
          </ActionButton>
        </div>
        <div className={styles.rightDisplayPictureWrapper}>
          <img
            src={MigrationDisplay}
            className={styles.rightDisplayPicture}
            alt="migration display"
          />
        </div>
        {newUserExperiencePopup()}
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  termsOfService: get(state, 'userOnboarding.termsOfService'),
  privacyPolicy: get(state, 'userOnboarding.privacyPolicy'),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
    fetchTOS: () => dispatch(fetchTOS()),
    fetchPP: () => dispatch(fetchPP()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellgoPilotOnboarding);
